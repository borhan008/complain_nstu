const db = require("../config/db");

exports.createComplain = async ({ uid, details, docs }) => {
  const [result] = await db.query(
    "INSERT INTO complains (uid, details, docs) VALUES (?, ?, ?)",
    [uid, details, docs]
  );
  return result;
};

exports.getComplains = async ({ uid }) => {
  const [result] = await db.query(
    "SELECT * FROM complains WHERE uid = ? ORDER BY c_id DESC",
    [uid]
  );

  return result;
};

exports.getOneComplain = async ({ c_id, uid }) => {
  const [result] = await db.query(
    "SELECT * FROM complains WHERE c_id = ? AND uid = ?",
    [c_id, uid]
  );

  return result;
};

exports.updateComplain = async ({ c_id, uid, details, docs }) => {
  const [result] = await db.query(
    "UPDATE complains SET details = ?, docs = ? WHERE c_id = ? AND uid = ?",
    [details, docs, c_id, uid]
  );

  return result;
};
