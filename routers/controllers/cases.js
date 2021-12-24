const casesModule = require("../../db/models/cases");
const userModel = require("../../db/models/user");

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

module.exports =  newCase