const casesModel = require("../../db/models/cases");
const tabModel = require("../../db/models/tab");

const newCase = (req, res) => {
  const { title, Descraption, laywer, client } = req.body;
  const newCases = new casesModel({
    title,
    Descraption,
    // status: isCase ? process.env.PENDING : process.env.APPROVED,
    laywer,
    client,
  });
  newCases
    .save()
    .then((result) => {
      console.log("result in line 14", result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getCase = (req, res) => {
  console.log("this request on line 24", req.params);
  const { id } = req.params;
  console.log("this id on line 26  ", id);

  try {
    casesModel.findOne({ _id: id }).then((result) => {
      console.log("this is result on line 33", result);
      if (result.isDel == false) {
        res.status(200).json(result);
      } else {
        res.status(404).send("case deleted");
      }
    });
  } catch (err) {
    res.status(400).json("this err", err);
    console.log(err);
  }
};
const showcase = (req, res) => {
  const { laywer, client } = req.body;
  console.log(laywer);
  casesModel
    .find({ laywer, client })
    // .populate("tab", " title Descraption -_id")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const updateCase = (req, res) => {
  const { id } = req.params;
  const { Descraption } = req.body;

  casesModel
    .findByIdAndUpdate(id, { $set: { Descraption: Descraption } })
    .then((result) => {
      if (result) {
        res.status(200).json("updated");
      } else {
        res.status(400).json(err);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteCase = (req, res) => {
  const { id } = req.params;
  casesModel
    .findByIdAndUpdate(id, { $set: { isDel: true } })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json("case is delete");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const ChengeCaseStatus = (req, res) => {
  const { id } = req.params;
  const { status_id } = req.body;

  userModel
    .findByIdAndUpdate({ _id: id }, { status: status_id }, { new: true })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: ` ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  newCase,
  getCase,
  showcase,
  updateCase,
  deleteCase,
  ChengeCaseStatus,
};
