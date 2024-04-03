const express = require("express");
const bodyParser = require("body-parser");

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

  const app = express();
  const port = 3000;

  app.use(bodyParser.json());
  app.use("/api/firms", firmRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/employees", employeeRoutes);
  app.use("/api/menus", menuItemRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/leave-types", leaveTypesRoutes);
  app.use("/api/docs", documentRoutes);
  app.use("/api/documents", documentRoutes);
  app.use("/api/leaves", leaveRoutes);
  app.use("/api/tables", tableRoutes);
  app.use("/api/feedback", feedbackRoute);
  app.use("/api/tables-session", tableSessionRoutes);
  app.use("/api/firm-subscriptions", firmSubscriptionRoutes);
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  await initializeRoles();
  await initializeFirmTypes();
  await initializeSubsription();
  // await sequelize.sync({ alter: true });
}

init();

// let sql = "ALTER TABLE your_table_name\n";
// for (let i = 1; i <= 60; i++) {
//   sql += `  DROP INDEX \`email_${i}\`${i < 60 ? "," : ""}\n`;
// }

// console.log(sql);
