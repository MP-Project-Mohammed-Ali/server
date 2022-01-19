const tabModel = require("../../db/models/tab");
const casesModule = require("../../db/models/cases");

const CreateTab = (req, res) => {
  const { title, Descraption, image, caseID } = req.body;
  const newTab = new tabModel({
    title,
    Descraption,
    image,
    caseID,
    userId: req.token.id,
  });
  newTab
    .save()
    .then((result) => {
      casesModule
        .findByIdAndUpdate(caseID, { $push: { tab: result._id } })
        .populate("tab Descraption")
        .then((result) => {
          res.status(201).json(result);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const GetTab = (req, res) => {
  const { caseID } = req.body;

  tabModel
    .find({ caseID })

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteTab = (req, res) => {
  const { id } = req.params;
  tabModel
    .findByIdAndUpdate(id, { $set: { isDelete: true } })
    .exec()
    .then((result) => {
      res.status(200).json("tab is delete");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateTab = (req, res) => {
  const { id } = req.params;
  const { title, Descraption, image } = req.body;

  tabModel
    .findByIdAndUpdate(id, {
      $set: { title: title, Descraption: Descraption, image: image },
    })
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

module.exports = { CreateTab, GetTab, deleteTab, updateTab };
