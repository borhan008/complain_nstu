const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const complainRoute = require("./complainRoute");
router.use("/user/", userRoute);
router.use("/complain/", complainRoute);
module.exports = router;
