const tabModel = require("../../db/models/tab");
const casesModule = require("../../db/models/cases");

const CreateTab = (req, res) => {
  const { title, Descraption, image, caseID } = req.body;
  console.log(req.token);
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
    .find({caseID})
    // .populate("caseID", "Descraption", "title")

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { CreateTab, GetTab };
