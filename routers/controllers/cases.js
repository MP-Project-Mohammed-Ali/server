const casesModule = require("../../db/models/cases");
const tabModule = require("../../db/models/tab");

const newCase = (req, res) => {
  console.log("request from line 5", req.body);
  const { title, Descraption } = req.body;
  const newCases = new casesModule({
    title,
    Descraption,
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

// Here funcation was a problem
const getCase = (req, res) => {
  console.log("this request on line 24", req.params);
  const { id } = req.params;
  console.log("this id on line 26  ", id);

  try {
    userModel
      .findOne({ _id: id })
      .populate(" ")
      .then((result) => {
        console.log("this is result on line 30", result);
        if (result.isDelete == false) {
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
  casesModule
    .find({ isDel: false })
    .populate("")
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

  casesModule
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
  casesModule
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


module.exports = { newCase, getCase, showcase, updateCase, deleteCase };
