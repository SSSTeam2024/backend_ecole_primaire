const Cantine = require("../../models/cantineModel/cantineModel");

const createCantine = async (cantineData) => {
  return await Cantine.create(cantineData);
};

const getCantines = async () => {
  return await Cantine.find();
};

const updateCantine = async (id, updateData) => {
  return await Cantine.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCantine = async (id) => {
  return await Cantine.findByIdAndDelete(id);
};

module.exports = {
  createCantine,
  getCantines,
  updateCantine,
  deleteCantine,
};
