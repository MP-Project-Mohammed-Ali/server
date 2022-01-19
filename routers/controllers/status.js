const statusModel = require("../../db/models/status");

const addStatus = (req, res) => {
  const { status } = req.body;

  const newstatus = new statusModel({
    status,
  });
  newstatus
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getStatus = (req, res) => {
  statusModel
    .find({})
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ massage: "there is no status yet" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addStatus, getStatus };
