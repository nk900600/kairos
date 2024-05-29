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
} = require("./src/models/subscription.model");
const initializeSubsription = require("./src/utils/create-subscription");
const authMiddleware = require("./src/middleware/auth.middleware");
const authController = require("./src/controllers/auth.controller");
const { subscriptions } = require("./src/utils/web-notification");

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
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          const msg =
            "The CORS policy for this site does not allow access from the specified origin.";
          return callback(new Error(msg), false);
        }
      }, // Replace with the URL of your front-end app
      credentials: true,
      // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      // allowedHeaders:
      //   "Origin,X-Requested-With,Content-Type,Accept,Authorization",
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

  app.post("/api/subscribe", (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
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

// let sql = "ALTER TABLE CategoryTypes\n";
// for (let i = 1; i <= 60; i++) {
//   sql += `  DROP INDEX \`title_${i}\`${i < 60 ? "," : ""}\n`;
// }

// console.log(sql);
