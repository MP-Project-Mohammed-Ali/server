const roleModel = require("../../db/models/role");

const authorization = async (req, res, next) => {
  try {
    const roleId = req.token.role;

    const result = await roleModel.findById(roleId);

    if (result.role === "Admin") {
      next();
    } else if (result.role === "Lawyer") {
      next();
    } else {
      return res.status(403).json({ massage: "forbidden" });
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = authorization;
