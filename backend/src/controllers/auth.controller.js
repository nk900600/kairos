const bcrypt = require("bcrypt");
const { Auth } = require("../models/auth.model");
const { Role, Employee } = require("../models/employee.model");
const { Firm } = require("../models/firm.model");
const jwt = require("jsonwebtoken");
const geoip = require("geoip-lite");
const { mobileNumberRegex, emailRegex } = require("../utils/const");
class AuthController {
  constructor() {
    this.generateOtp = this.generateOtp.bind(this);
    this.generateOtpHelper = this.generateOtpHelper.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.onboarding = this.onboarding.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);
    this.generateToken = this.generateToken.bind(this);
  }

  async signup(req, res) {
    try {
      let response = {};

      // Validate the request body
      console.log(req.body);

      if (
        !req.body?.mobileNumber ||
        !req.body?.email ||
        !req.body?.firstName ||
        !req.body?.lastName ||
        !req.body?.firmType ||
        !req.body?.otpType ||
        !req.body?.otpValue ||
        !req.body?.firmName
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Validate the mobile number
      if (!mobileNumberRegex.test(req.body?.mobileNumber)) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }
      // Validate the email
      if (!emailRegex.test(req.body?.email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const otpVerified = await this.verifyOtp(req.body);
      if (otpVerified) {
        response.employee = await this.onboarding(req.body);
        console.log(response.employee);
        response.token = this.generateToken(req.body);
      } else {
        return res.status(401).json({ message: "OTP verification failed" });
      }

      return res.status(201).json(response);
    } catch (error) {
      console.error("Error while signup:", error);
      res.status(500).json({ message: "Error while signup: " + error.message });
    }
  }

  async login(req, res) {
    try {
      let response = {};

      // Validate the request body
      if (!req.body.mobileNumber || !req.body.otpValue) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const otpVerified = await this.verifyOtp(req.body);
      if (otpVerified) {
        response.token = this.generateToken(req.body);
      } else {
        return res.status(401).json({ message: "OTP verification failed" });
      }

      return res.status(201).json(response);
    } catch (error) {
      console.error("Error while login:", error);
      res.status(500).json({ message: "Error while login: " + error.message });
    }
  }

  async onboarding(body) {
    try {
      const { mobileNumber, email, firstName, lastName, firmType, firmName } =
        body;
      let adminRole = await Role.findOne({ where: { name: "Admin" } });
      // Create the firm
      const firm = await Firm.create({
        name: firmName,
        type: firmType,
        mobileNumber,
        email,
      });
      // Create the employee with the admin role and firm ID
      const employee = await Employee.create({
        mobileNumber,
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: adminRole.id,
        firmId: firm.id,
      });
      return employee;
      // Implement login logic
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async generateOtp(req, res) {
    try {
      const otpDetails = req.body;

      // Validate the mobile number
      if (!mobileNumberRegex.test(otpDetails.mobileNumber)) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }

      otpDetails.ipAddress = otpDetails?.ipAddress || req.ip;
      otpDetails.countryCode = otpDetails?.countryCode || "+91";
      otpDetails.deviceInfo =
        otpDetails?.deviceInfo || req.headers["user-agent"]; // Example: using User-Agent header
      const geo = geoip.lookup(otpDetails.ipAddress);
      otpDetails.region = otpDetails?.region || (geo ? geo.city : "Unknown");

      // Validate the request body
      if (!otpDetails.mobileNumber || !otpDetails.otpType) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await this.generateOtpHelper(otpDetails);

      if (result.success) {
        res.status(200).json({
          message: "OTP generated successfully",
          otpRecord: result.otpRecord,
        });
      } else {
        res.status(429).json({ message: result.message }); // 429 Too Many Requests for cooldown error
      }
    } catch (error) {
      console.error("Error while generating OTP:", error);
      res
        .status(500)
        .json({ message: "Error while generating OTP: " + error.message });
    }
  }

  async generateOtpHelper(otpDetails) {
    try {
      const {
        mobileNumber,
        countryCode,
        otpType,
        ipAddress,
        deviceInfo,
        region,
      } = otpDetails;

      const existingOtpRecord = await Auth.findOne({
        where: { mobileNumber: mobileNumber, otpType },
        order: [["createdAt", "DESC"]],
      });

      // Check for cooldown period
      if (existingOtpRecord) {
        if (
          existingOtpRecord.cooldownUntil &&
          existingOtpRecord.cooldownUntil > new Date()
        ) {
          return {
            success: false,
            message: "Too many failed attempts. Please try again later.",
          };
        }

        // Set the cooldown period to 10 minutes from now
        if (existingOtpRecord.failedOtpCount >= 3) {
          await existingOtpRecord.update({
            cooldownUntil: new Date(Date.now() + 1 * 60 * 1000),
            failedOtpCount: 0,
          });
          return {
            success: false,
            message:
              "Too many failed attempts. Please try again later after 10 mins.",
          };
        }
      }

      const otpValue = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
      const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // Set OTP expiration time

      let otpRecord;

      if (existingOtpRecord && existingOtpRecord.failedOtpCount < 3) {
        // Update the existing record with a new OTP and increment the failedOtpCount
        otpRecord = await existingOtpRecord.update({
          otpValue,
          otpExpiresAt,
          failedOtpCount: existingOtpRecord.failedOtpCount + 1,
          cooldownUntil: null, // Reset cooldown period
        });
      } else {
        otpRecord = await Auth.create({
          mobileNumber: mobileNumber,
          countryCode,
          otpType,
          otpValue,
          otpExpiresAt,
          ipAddress,
          deviceInfo,
          region,
          failedOtpCount: 0, // Reset failed OTP count
          cooldownUntil: null, // Reset cooldown period
        });
      }

      // Send the OTP to the user's mobile number (implementation depends on your SMS service)
      // await sendOtpToMobile(mobileNumber, otpValue);

      return { success: true, otpRecord };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error generating OTP" };
    }
  }

  async verifyOtp(otpDetails) {
    try {
      const { mobileNumber, otpType, otpValue } = otpDetails;
      const otpRecord = await Auth.findOne({
        where: { mobileNumber, otpType },
        order: [["createdAt", "DESC"]],
      });

      if (!otpRecord) {
        throw new Error("OTP record not found");
      }

      if (otpRecord.otpExpiresAt < new Date()) {
        throw new Error("OTP has expired");
      }

      if (otpRecord.otpValue !== otpValue) {
        throw new Error("Invalid OTP");
      }

      return true; // OTP verification successful
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }

  generateToken(tokenObj) {
    // Generate a token for authentication
    const token = jwt.sign({ ...tokenObj }, process.env.JWT_SECRET, {
      expiresIn: "300d",
    }); // Adjust the secret and expiration as needed

    return token;
  }
}

module.exports = new AuthController();
