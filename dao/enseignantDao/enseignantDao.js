const Enseignant = require("../../models/enseignantModel/enseignantModel");

const createEnseignant = async (enseignantData) => {
  return await Enseignant.create(enseignantData);
};

const getEnseignants = async () => {
  return await Enseignant.find();
};

const updateEnseignant = async (id, updateData) => {
  return await Enseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEnseignant = async (id) => {
  return await Enseignant.findByIdAndDelete(id);
};

module.exports = {
  createEnseignant,
  getEnseignants,
  deleteEnseignant,
  updateEnseignant,
};
