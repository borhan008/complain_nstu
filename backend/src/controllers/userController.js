const userQueries = require("../queries/userQueries");

exports.createUser = async (req, res) => {
  const rollReg = /^[a-zA-Z]{3}\d{7}$/;
  const mobileReg = /^(\+88)?01[0-9]{9}$/;
  try {
    const { roll, mobile } = req.body;
    const { uid, email } = req.user;
    const name = req.user.displayName;
    if (!rollReg.test(roll) || !mobileReg.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Invalid roll number or mobile number" });
    }
    const user = await userQueries.createUser({
      uid,
      name,
      roll,
      email,
      mobile,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

exports.checkUser = async (req, res) => {
  const uid = req.user.uid;
  try {
    const user = await userQueries.checkUser(uid);
    console.log(user);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};
