const enseignantDao = require("../../dao/enseignantDao/enseignantDao");

const createEnseignant = async (enseignantData) => {
  return await enseignantDao.createEnseignant(enseignantData);
};

const getEnseignants = async () => {
  return await enseignantDao.getEnseignants();
};

module.exports = {
  createEnseignant,
  getEnseignants,
};
