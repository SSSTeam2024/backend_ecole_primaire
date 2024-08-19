const Enseignant = require("../../models/enseignantModel/enseignantModel");

const createEnseignant = async (enseignantData) => {
  return await Enseignant.create(enseignantData);
};

const getEnseignants = async () => {
  return await Enseignant.find();
};

module.exports = {
  createEnseignant,
  getEnseignants,
};
