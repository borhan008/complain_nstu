const db = require("../config/db");

exports.createUser = async ({ uid, name, roll, email, mobile }) => {
  const check = await this.checkUser(uid);

  if (check.length === 0) {
    const [result] = await db.query(
      "INSERT INTO users (uid, name, roll, email, mobile) VALUES (?, ?, ?, ?, ?)",
      [uid, name, roll, email, mobile]
    );
    return result;
  } else {
    const [result] = await db.query(
      "UPDATE users SET name = ?, roll = ?, email = ?, mobile = ? WHERE uid = ?",
      [name, roll, email, mobile, uid]
    );
    return result;
  }
};

exports.checkUser = async (uid) => {
  const [result] = await db.query(
    "SELECT uid, roll, mobile FROM users WHERE uid = ?",
    [uid]
  );

  return result;
};
