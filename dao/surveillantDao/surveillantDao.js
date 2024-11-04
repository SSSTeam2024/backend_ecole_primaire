const Surveillant = require("../../models/surveillantModel/surveillantModel");

const createSurveillant = async (surveillantData) => {
  return await Surveillant.create(surveillantData);
};

const getSurveillants = async () => {
  return await Surveillant.find();
};

const updateSurveillant = async (id, updateData) => {
  return await Surveillant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSurveillant = async (id) => {
  return await Surveillant.findByIdAndDelete(id);
};

module.exports = {
  createSurveillant,
  getSurveillants,
  updateSurveillant,
  deleteSurveillant,
};
