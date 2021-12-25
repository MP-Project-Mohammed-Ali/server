const tabModel = require("../../db/models/tab");
const casesModule = require("../../db/models/cases");

const createtab = (req, res) => {
  const { id } = req.params;
  const { title, Descraption, image,caseID } = req.body;
  const newTab = new tabModel({
    title,
    Descraption,
    image,
    caseID,

  });
  tabModel.save().then((result)=>{
      casesModule.findByIdAndUpdate(caseID,{$push:{tabId:result._id}}).then((result)=>{
          res.status(201).json(result)
      })
  }).catch((err)=>{
      res.status(400).json(err)
  })
};
