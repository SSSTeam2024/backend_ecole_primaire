const enseignantDao = require("../../dao/enseignantDao/enseignantDao");

const createEnseignant = async (enseignantData) => {
  return await enseignantDao.createEnseignant(enseignantData);
};

const getEnseignants = async () => {
  return await enseignantDao.getEnseignants();
};

const deleteEnseignant = async (id) => {
  return await enseignantDao.deleteEnseignant(id);
};

module.exports = {
  createEnseignant,
  getEnseignants,
  deleteEnseignant,
};
