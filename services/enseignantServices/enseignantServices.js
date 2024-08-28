const enseignantDao = require("../../dao/enseignantDao/enseignantDao");

const createEnseignant = async (enseignantData) => {
  return await enseignantDao.createEnseignant(enseignantData);
};

const getEnseignants = async () => {
  return await enseignantDao.getEnseignants();
};

const updateEnseignant = async (id, updateData) => {
  return await enseignantDao.updateEnseignant(id, updateData);
};

const deleteEnseignant = async (id) => {
  return await enseignantDao.deleteEnseignant(id);
};

module.exports = {
  createEnseignant,
  getEnseignants,
  deleteEnseignant,
  updateEnseignant,
};
