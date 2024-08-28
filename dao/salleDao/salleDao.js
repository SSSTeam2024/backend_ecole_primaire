const Salle = require("../../models/salleModel/salleModel");

const createSalle = async (salleData) => {
  return await Salle.create(salleData);
};

const getSalles = async () => {
  return await Salle.find();
};

const updateSalle = async (id, updateData) => {
  return await Salle.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSalle = async (id) => {
  return await Salle.findByIdAndDelete(id);
};

module.exports = {
  createSalle,
  getSalles,
  updateSalle,
  deleteSalle,
};
