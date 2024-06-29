const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("./env/.env.dev");
const envFile = `./env/.env.${process.env.NODE_ENV || "dev"}`;
dotenv.config({ path: envFile });
dotenv.config({ path: `./env/.env.common` });
const sequelize = require("./src/db/db");
const initializeRoles = require("./src/utils/create-roles");
const initializeFirmTypes = require("./src/utils/create-firm-types");
const {
  Subscription,
  FirmSubscription,
  SubscriptionStateType,
} = require("./src/models/subscription.model");
const initializeSubsription = require("./src/utils/create-subscription");
const authMiddleware = require("./src/middleware/auth.middleware");
const authController = require("./src/controllers/auth.controller");
const { WebSubscription } = require("./src/models/websubscriptions");
const fs = require("fs");
const { exec } = require("child_process");
const { s3 } = require("./src/utils/aws-obj");
const path = require("path");

async function init() {
  const authRoutes = require("./src/routes/auth.routes");
  const firmRoutes = require("./src/routes/firm.routes");
  const employeeRoutes = require("./src/routes/employee.routes");
  const menuItemRoutes = require("./src/routes/menuItem.routes");
  const orderRoutes = require("./src/routes/order.routes");
  const documentRoutes = require("./src/routes/document.routes");
  const feedbackRoute = require("./src/routes/feedback.routes");
  const leaveRoutes = require("./src/routes/leave.routes");
  const tableRoutes = require("./src/routes/table.routes");
  const leaveTypesRoutes = require("./src/routes/leavesTypes.routes");
  const tableSessionRoutes = require("./src/routes/tableSession.routes");
  const firmSubscriptionRoutes = require("./src/routes/firmSubscription.routes");
  const desginationRoutes = require("./src/routes/designation.routes");
  const cartRoutes = require("./src/routes/cart.routes");
  const router = express.Router();
  const app = express();
  const port = 4200;

  const allowedOrigins = [
    "https://app.theshopbusiness.com",
    "http://app.theshopbusiness.com",
    "http://localhost:3000",
    "http://localhost:4200",
    "http://192.168.43.209:3000",
    "http://192.168.43.209:4200",
    "https://test.cashfree.com",
    "https://api.cashfree.com",
    "https://payments-test.cashfree.com",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || origin === "null") return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          const msg =
            "The CORS policy for this site does not allow access from the specified origin.";
          return callback(new Error(msg), false);
        }
      }, // Replace with the URL of your front-end app
      optionsSuccessStatus: 200,
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders:
        "Origin,X-Requested-With,Content-Type,Accept,Authorization, Access-Control-Allow-Origin,x-refresh-token",
    })
  );

  app.use(bodyParser.json());
  app.use("/api/firms", authMiddleware, firmRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/employees", authMiddleware, employeeRoutes);
  app.use("/api/menus", authMiddleware, menuItemRoutes);
  app.use("/api/orders", authMiddleware, orderRoutes);
  app.use("/api/leave-types", authMiddleware, leaveTypesRoutes);
  // app.use("/api/docs", authMiddleware,documentRoutes);
  // app.use("/api/documents", documentRoutes);
  app.use("/api/leaves", authMiddleware, leaveRoutes);
  app.use("/api/tables", authMiddleware, tableRoutes);
  app.use("/api/feedback", authMiddleware, feedbackRoute);
  app.use("/api/designations", authMiddleware, desginationRoutes);
  app.use("/api/tables-session", authMiddleware, tableSessionRoutes);
  app.use("/api/firm-subscriptions", authMiddleware, firmSubscriptionRoutes);
  app.use("/api/cart-items", authMiddleware, cartRoutes);

  app.post("/api/payment-redirect/:firmId", async (req, res) => {
    await FirmSubscription.update(
      {
        isActive: true,
        subscriptionState: SubscriptionStateType.ACTIVE,
      },
      { where: { FirmId: req.params.firmId } }
    );

    res.redirect(`http://localhost:3000/dashboard`);
  });

  app.post("/api/subscribe", authMiddleware, async (req, res) => {
    const subscription = req.body;
    try {
      const existingSubscription = await WebSubscription.findOne({
        where: { endpoint: subscription.endpoint, firmId: subscription.firmId },
      });

      if (!existingSubscription) {
        await WebSubscription.create({
          endpoint: subscription.endpoint,
          keys: subscription.keys,
          firmId: subscription.firmId,
          designationId: subscription.designationId,
        });
      }
      res.status(201).json({});
    } catch (e) {
      res.status(400).json({ error: "Something went wrong" + e });
    }
  });
  app.get("/api/take-sql-dump", authMiddleware, async (req, res) => {
    try {
      // Get the database configuration
      const config = sequelize.config;
      const sqlBackup = path.join(__dirname, "database_backups");
      // Ensure the dump directory exists
      if (!fs.existsSync(sqlBackup)) {
        fs.mkdirSync(sqlBackup, { recursive: true });
      }

      const dockerContainerName = "karios-mysql"; // Adjust the container name as needed

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const dumpFilename = `dump_${timestamp}.sql`;

      // Create a temporary file to store MySQL credentials
      const tmpConfigPath = path.join(sqlBackup, ".my.cnf");
      fs.writeFileSync(
        tmpConfigPath,
        `[client]\nuser=${config.username}\npassword=${config.password}\n`,
        { mode: 0o600 }
      );

      const copyConfigCommand = `docker cp ${tmpConfigPath} ${dockerContainerName}:/tmp/.my.cnf`;
      await exec(copyConfigCommand, async (error, stdout, stderr) => {});
      const changeTmpPermsCommand2 = `docker exec ${dockerContainerName} chmod 605 /tmp/.my.cnf`;
      await exec(changeTmpPermsCommand2, async (error, stdout, stderr) => {});
      const changeTmpPermsCommand = `docker exec ${dockerContainerName} chmod 777 /tmp/dump.sql`;
      await exec(changeTmpPermsCommand, async (error, stdout, stderr) => {});
      const dumpCommand = `docker exec -u mysql ${dockerContainerName} bash -c "mysqldump --defaults-extra-file=/tmp/.my.cnf -h localhost ${config.database} > /tmp/dump.sql && cat /tmp/dump.sql && rm /tmp/.my.cnf /tmp/dump.sql"`;

      // Execute the mysqldump command
      await exec(dumpCommand, async (error, stdout, stderr) => {
        if (error) {
          return res.status(400).json({
            error: "Something went wrong - dumpCommand" + error.message,
          });
        }
        if (stderr) {
          return res
            .status(400)
            .json({ error: "Something went wrong - dumpCommand" + stderr });
          // throw new Error(stderr);
        }
        const params = {
          Bucket: "kairos-sql-backup",
          Key: dumpFilename,
          Body: stdout,
        };
        await s3.upload(params).promise();

        res.status(201).json({});
      });
    } catch (e) {
      res.status(400).json({ error: "Something went wrong" + e });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  // await initializeRoles();
  // await initializeFirmTypes();
  // await initializeSubsription();
  // await sequelize.sync({ alter: true });
}

init();

// let sql = "ALTER TABLE Tables\n";
// for (let i = 1; i <= 60; i++) {
//   sql += `  DROP INDEX \`tableName_${i}\`${i < 60 ? "," : ""}\n`;
// }

// console.log(sql);
