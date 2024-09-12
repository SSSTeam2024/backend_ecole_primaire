const niveauDao = require("../../dao/niveauDao/niveauDao");

const createNiveau = async (niveaueData) => {
  return await niveauDao.createNiveau(niveaueData);
};

const getNiveaux = async () => {
  return await niveauDao.getNiveaux();
};

const updateNiveau = async (id, updateData) => {
  return await niveauDao.updateNiveau(id, updateData);
};

const deleteNiveau = async (id) => {
  return await niveauDao.deleteNiveau(id);
};

module.exports = {
  createNiveau,
  getNiveaux,
  updateNiveau,
  deleteNiveau,
};
