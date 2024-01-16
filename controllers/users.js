const User = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await User.find();
  res.json(result);
};

// const getById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await users.getById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

const add = async (req, res) => {
  const result = await User.create(req.body);
  res.status(201).json(result);
};

// const updateById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await users.updateById(id, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const deleteById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await users.deleteById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "Delete success",
//   });
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};