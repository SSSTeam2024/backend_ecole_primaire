const Matiere = require("../../models/matiereModel/matriereModel");

const createMatiere = async (matiereData) => {
  return await Matiere.create(matiereData);
};

const getMatieres = async () => {
  return await Matiere.find();
};

const updateMatiere = async (id, updateData) => {
  return await Matiere.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMatiere = async (id) => {
  return await Matiere.findByIdAndDelete(id);
};

module.exports = {
  createMatiere,
  getMatieres,
  updateMatiere,
  deleteMatiere,
};
