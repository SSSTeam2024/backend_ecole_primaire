const Enseignant = require("../../models/enseignantModel/enseignantModel");

const createEnseignant = async (enseignantData) => {
  return await Enseignant.create(enseignantData);
};

const getEnseignants = async () => {
  return await Enseignant.find();
};

const deleteEnseignant = async (id) => {
  return await Enseignant.findByIdAndDelete(id);
};

module.exports = {
  createEnseignant,
  getEnseignants,
  deleteEnseignant,
};
