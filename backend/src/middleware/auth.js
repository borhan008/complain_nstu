const admin = require("../config/firebaseAdmin");

const authMiddleWare = async (req, res, next) => {
  console.log("body", req);
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodeToken = await admin.auth().verifyIdToken(token);
    req.user = decodeToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleWare;
