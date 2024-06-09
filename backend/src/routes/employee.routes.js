const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/me", employeeController.getCurrentuserInfo);
router.get("/get-employee", employeeController.GetEmployeesBetweenDatesRange);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", employeeController.createEmployee);
router.post("/bulk", employeeController.createEmployeeBulk);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.post(
  "/:id/user-pic",
  upload.single("file"),
  employeeController.uploadUserPic
);

module.exports = router;
