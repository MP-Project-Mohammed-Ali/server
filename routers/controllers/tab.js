const tabModel = require("../../db/models/tab");
const casesModule = require("../../db/models/cases");

const createtab = (req, res) => {
  const { title, Descraption, image,caseID } = req.body;
  console.log(req.token);
  const newTab = new tabModel({
    title,
    Descraption,
    image,
    caseID,
    userId: req.token.id,
  })
  newTab.save()
    .then((result) => {
      casesModule
        .findByIdAndUpdate(caseID, { $push: { tab: result._id } }).populate("")
        .then((result) => {
          res.status(201).json(result);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



module.exports = createtab;
