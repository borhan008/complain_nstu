const complainQueries = require("../queries/complainQueries");

exports.createComplain = async (req, res) => {
  const { uid } = req.user;
  const { details, docs } = req.body;
  console.log(details, docs);
  try {
    const complain = await complainQueries.createComplain({
      uid,
      details,
      docs,
    });
    return res
      .status(201)
      .json({ message: "Complain created successfully", data: complain });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getComplains = async (req, res) => {
  try {
    const complains = await complainQueries.getComplains({ uid: req.user.uid });
    return res.status(200).json({ complains });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

exports.getOneComplain = async (req, res) => {
  const { c_id } = req.params;
  try {
    const complains = await complainQueries.getOneComplain({
      c_id,
      uid: req.user.uid,
    });
    if (complains.length === 0)
      return res.status(404).json({ message: "Complain not found" });
    return res.status(200).json({ complains });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};
