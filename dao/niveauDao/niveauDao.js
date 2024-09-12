const Niveau = require("../../models/niveauModel/niveauModel");

const createNiveau = async (niveauData) => {
  return await Niveau.create(niveauData);
};

const getNiveaux = async () => {
  return await Niveau.find();
};

const updateNiveau = async (id, updateData) => {
  return await Niveau.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNiveau = async (id) => {
  return await Niveau.findByIdAndDelete(id);
};

module.exports = {
  createNiveau,
  getNiveaux,
  updateNiveau,
  deleteNiveau,
};
