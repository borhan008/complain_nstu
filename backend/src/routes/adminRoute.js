const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const deptRoute = require("./deptRoute");

router.get("/users", userController.showUserWithLimitRange);
router.put("/role", userController.changeRole);
router.put("/block", userController.blockUser);

router.use("/department/", deptRoute);
module.exports = router;
