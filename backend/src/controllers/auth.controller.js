const { Auth } = require("../models/auth.model");
const { Role, Employee, Designation } = require("../models/employee.model");
const { Firm } = require("../models/firm.model");
const jwt = require("jsonwebtoken");
const geoip = require("geoip-lite");
const { mobileNumberRegex, emailRegex } = require("../utils/const");
const sequelize = require("../db/db");
const RefreshToken = require("../models/refreshTokens.model");

const TOKEN_EXPIRY = "365d";
const TOKEN_REFRESH_EXPIRY = "365d";
const FASt2SMSTOKEN = process.env.FASt2SMSTOKEN;
const axios = require("axios");
const {
  FirmSubscription,
  Subscription,
} = require("../models/subscription.model");
const { EmailService } = require("../utils/send-email");
const {
  welcomeBody,
} = require("../utils/emailTemplate/welcomeMessageTemplate");
const { getRandomGradient } = require("../utils/colorGradient");
const { emailOtpTemplate } = require("../utils/emailTemplate/emailOtpTemplate");

// Create an instance of axios with a base URL and default headers
const fast2smsApiAxios = axios.create({
  baseURL: "https://www.fast2sms.com/dev/", // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
    authorization: FASt2SMSTOKEN,
  },
});

class AuthController {
  constructor() {
    this.generateOtp = this.generateOtp.bind(this);
    this.generateOtpHelper = this.generateOtpHelper.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.onboarding = this.onboarding.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);
    this.generateToken = this.generateToken.bind(this);
    this.refreshAccessToken = this.refreshAccessToken.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
    this.createTokenApi = this.createTokenApi.bind(this);
    this.generateAndStoreRefreshToken =
      this.generateAndStoreRefreshToken.bind(this);
  }

  async signup(req, res) {
    const transaction = await sequelize.transaction();

    try {
      let response = {};

      // Validate the request body

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
        const { employee, refreshToken } = await this.onboarding(
          req.body,
          transaction
        );
        response.token = this.generateToken(employee);
        response.employee = employee;
        response.refreshToken = refreshToken;
      } else {
        return res.status(401).json({ message: "OTP verification failed" });
      }

      transaction.commit();

      // Setup email data
      const mailOptions = {
        from: '"The Shop Business Inc" <nikhil@theshopbusiness.com>', // Sender address
        to: response.employee.email, // List of recipients
        subject: "Thanks for Signing Up to TheShopBusiness", // Subject line
        html: welcomeBody(
          response.employee.firstName + " " + response.employee.lastName
        ), // HTML body
      };
      try {
        EmailService.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      } catch (e) {
        console.log("Email was not send");
      }

      return res.status(201).json(response);
    } catch (error) {
      console.error("Error while signup:", error);
      transaction.rollback();
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

      let isEmployee = await Employee.findOne({
        where: { mobileNumber: req.body.mobileNumber },
      });
      if (!isEmployee) {
        return res.status(401).json({ message: "Not a valid user" });
      }
      const otpVerified = await this.verifyOtp(req.body);
      if (otpVerified) {
        response.token = this.generateToken(isEmployee);
        response.refreshToken = await this.generateAndStoreRefreshToken(
          isEmployee
        );
      } else {
        return res.status(401).json({ message: "OTP verification failed" });
      }

      return res.status(201).json(response);
    } catch (error) {
      console.error("Error while login:", error);
      res.status(500).json({ message: "Error while login: " + error.message });
    }
  }

  async onboarding(body, transaction) {
    try {
      const { mobileNumber, email, firstName, lastName, firmType, firmName } =
        body;
      let adminRole = await Role.findOne({ where: { name: "Admin" } });
      const designation = await Designation.findOne(
        { where: { title: "Restaurant Manager" } },
        {}
      );
      // Create the firm
      const firm = await Firm.create(
        {
          name: firmName,
          type: firmType,
          mobileNumber,
          email,
          image: getRandomGradient(),
        },
        { transaction }
      );
      // Create the employee with the admin role and firm ID
      const employee = await Employee.create(
        {
          mobileNumber,
          email: email,
          firstName: firstName,
          lastName: lastName,
          roleId: adminRole.id,
          firmId: firm.id,
          userPic: getRandomGradient(),
          designationId: designation.id,
        },
        { transaction }
      );

      const subscription = await Subscription.findOne(
        { where: { id: "1" } },
        {}
      );

      const currentDate = new Date(); // Get the current date
      const futureDate = new Date(currentDate); // Create a new Date object based on the current date
      futureDate.setDate(futureDate.getDate() + subscription.trialPeriod);

      await FirmSubscription.create(
        {
          billingCycle: "monthly",
          SubscriptionId: "1",
          trialStartDate: new Date(),
          trialEndDate: futureDate,
          nextBillingDate: futureDate,
          FirmId: firm.id,
        },
        { transaction }
      );

      const refreshToken = jwt.sign(
        { user: employee },
        process.env.JWT_SECRET,
        {
          expiresIn: TOKEN_REFRESH_EXPIRY,
        }
      );

      // Store the refresh token in the database
      await RefreshToken.create(
        {
          token: refreshToken,
          employeeId: employee.id,
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
        { transaction }
      );

      return { employee, refreshToken };
      // Implement login logic
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async generateOtp(req, res) {
    try {
      const otpDetails = req.body;

      // Validate the request body
      if (
        // !otpDetails?.mobileNumber ||
        // !otpDetails?.email ||
        !otpDetails.otpType
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Validate the mobile number
      if (
        otpDetails?.mobileNumber &&
        !mobileNumberRegex.test(otpDetails?.mobileNumber)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }
      if (otpDetails?.email && !emailRegex.test(otpDetails?.email)) {
        return res.status(400).json({ message: "Invalid Email format" });
      }

      const isEmail = !!otpDetails?.email;
      if (isEmail) {
        otpDetails.mobileNumber = 0;
      } else {
        otpDetails.email = "";
      }
      const user = await Employee.findOne({
        where: {
          [isEmail ? "email" : "mobileNumber"]: isEmail
            ? otpDetails.email
            : otpDetails.mobileNumber,
        },
      });

      if (otpDetails.otpType == "setting") {
        if (user) {
          return res
            .status(400)
            .json({ message: "User is already registered" });
        }
      } else {
        if (!user && otpDetails.otpType !== "signup") {
          return res.status(400).json({ message: "user not found" });
        }
        // if (user && otpDetails.otpType == "signup") {
        //   return res
        //     .status(400)
        //     .json({ message: "User is already registered, please login" });
        // }
      }

      otpDetails.ipAddress = otpDetails?.ipAddress || req.ip;
      otpDetails.countryCode = otpDetails?.countryCode || "+91";
      otpDetails.deviceInfo =
        otpDetails?.deviceInfo || req.headers["user-agent"]; // Example: using User-Agent header
      const geo = geoip.lookup(otpDetails.ipAddress);
      otpDetails.region = otpDetails?.region || (geo ? geo.city : "Unknown");

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
        email,
      } = otpDetails;

      let existingOtpRecord = await Auth.findOne({
        where: {
          [email ? "email" : "mobileNumber"]: email ? email : mobileNumber,
          otpType,
        },
        order: [["createdAt", "DESC"]],
      });

      // Check for cooldown period
      if (existingOtpRecord) {
        const now = new Date();
        if (
          existingOtpRecord.otpExpiresAt &&
          existingOtpRecord.otpExpiresAt <= now
        ) {
          await existingOtpRecord.destroy();
          existingOtpRecord = null;
        } else if (
          existingOtpRecord.cooldownUntil &&
          existingOtpRecord.cooldownUntil > now
        ) {
          // existingOtpRecord.otpValue = null;
          existingOtpRecord.save();
          return {
            success: false,
            message: "Too many attempts. Please try again after 10 mins later.",
          };
        }

        // Set the cooldown period to 10 minutes from now
        else if (existingOtpRecord.failedOtpCount >= 3) {
          await existingOtpRecord.update({
            cooldownUntil: new Date(Date.now() + 10 * 60 * 1000),
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

      if (email) {
        const mailOptions = {
          from: '"The Shop Business Inc" <nikhil@theshopbusiness.com>', // Sender address
          to: email, // List of recipients
          subject: "OTP for updating email", // Subject line
          html: emailOtpTemplate(otpValue), // HTML body
        };
        try {
          EmailService.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return
            }
            console.log("Message sent: %s", info.messageId);
          });
        } catch (e) {
          console.log("Email was not send");
        }
      } else {
        // commenting for now
        await fast2smsApiAxios.post("bulkV2", {
          route: "otp",
          variables_values: otpValue,
          numbers: mobileNumber,
        });
      }
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
          ...(email ? { email } : { mobileNumber }),
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

      await otpRecord.destroy();

      return true; // OTP verification successful
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }

  async logout(req, res) {
    try {
      const refreshToken = req.headers["x-refresh-token"];
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      await RefreshToken.destroy({ where: { employeeId: decoded.user.id } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error logging out" });
    }
  }
  async generateSwitchFirmToken(req, res) {
    try {
      const refreshToken = req.headers["x-refresh-token"];
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      await RefreshToken.destroy({ where: { employeeId: decoded.user.id } });

      if (!req.query?.firmId || !req.query?.userId) {
        return res.status(400).json({ error: "Firm is required" });
      }

      const { firmId } = req.query;

      const firm = await Firm.findOne({
        where: { id: firmId },
      });
      if (!firm) {
        return res.status(400).json({ error: "Firm not found" });
      }
      const user = await Employee.findOne({
        where: { id: decoded.user.id },
      });
      const newAccessToken = this.generateToken({ dataValues: user });
      const newRefreshToken = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: TOKEN_REFRESH_EXPIRY,
      });

      // Store the new refresh token in the database
      await RefreshToken.update(
        {
          token: newRefreshToken,
          userId: user.id,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
        },
        { where: { token: refreshToken } }
      );

      return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      res.status(500).json({ error: "Error logging out" });
    }
  }

  async getRefreshToken(req, res) {
    try {
      const refreshToken = req.headers["x-refresh-token"];

      const newAccessToken = await this.refreshAccessToken(refreshToken);
      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      console.log(decoded, "decoded");
      // Check if the refresh token exists in the database and is not expired
      const storedToken = await RefreshToken.findOne({
        where: { token: refreshToken },
      });
      if (!storedToken || storedToken.expiryDate < new Date()) {
        throw new Error("Invalid or expired refresh token");
      }

      const user = await Employee.findOne({
        where: { id: decoded.user.id },
      });

      const newAccessToken = await this.generateToken(user);

      return newAccessToken;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  async generateAndStoreRefreshToken(user) {
    // Generate a refresh token
    const refreshToken = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_REFRESH_EXPIRY,
    });

    // Store the refresh token in the database
    await RefreshToken.create({
      token: refreshToken,
      employeeId: user.id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });
    return refreshToken;
  }

  async createTokenApi(req, res) {
    try {
      const refreshToken = req.headers["x-refresh-token"];
      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is missing" });
      }
      if (!req.body?.firmId) {
        return res.status(400).json({ error: "Firm Id is missing" });
      }

      const { user } = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const employeeData = await Employee.findOne({
        where: { mobileNumber: user.mobileNumber, firmId: req.body.firmId },
      });

      console.log(employeeData, "employeeData");
      if (!employeeData) {
        return res
          .status(400)
          .json({ error: "Current user does not associate with choosen firm" });
      }

      // Generate new tokens
      const newAccessToken = this.generateToken({ dataValues: employeeData });
      const newRefreshToken = jwt.sign(
        { user: employeeData },
        process.env.JWT_SECRET,
        {
          expiresIn: TOKEN_REFRESH_EXPIRY,
        }
      );

      // Store the new refresh token in the database
      await RefreshToken.update(
        {
          token: newRefreshToken,
          userId: employeeData.id,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
        },
        { where: { token: refreshToken } }
      );

      return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  generateToken(tokenObj) {
    // Generate a token for authentication
    const token = jwt.sign(
      { user: tokenObj.dataValues },
      process.env.JWT_SECRET,
      {
        expiresIn: TOKEN_EXPIRY,
      }
    ); // Adjust the secret and expiration as needed

    return token;
  }
}

module.exports = new AuthController();
