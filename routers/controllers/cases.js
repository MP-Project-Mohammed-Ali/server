const casesModel = require("../../db/models/cases");
const tabModel = require("../../db/models/tab");

const newCase = (req, res) => {
  const { title, Descraption, laywer } = req.body;
  const newCases = new casesModel({
    title,
    Descraption,
    status: process.env.PENDING,
    laywer,
    client: req.token.id,
  });
  newCases
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getCase = (req, res) => {
  const { id } = req.params;

  try {
    casesModel
      .find({
        $or: [
          { laywer: id, isDel: false },
          { client: id, isDel: false },
        ],
      })
      .populate("status client")
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (err) {
    res.status(400).json("this err", err);
  }
};
const showcase = (req, res) => {
  const { laywer, client } = req.body;
  casesModel
    .find({ laywer, client, isDel: false })

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const laywercase = (req, res) => {
  casesModel
    .find({ laywer: req.token.id, status: process.env.PENDING })
    .populate("client")
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
      res.status(200).json("case is delete");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const ChengeCaseStatus = (req, res) => {
  const { id } = req.params;
  const { status_id } = req.body;

  casesModel
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
  laywercase,
};
