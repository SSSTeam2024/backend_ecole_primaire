const matiereDao = require("../../dao/matiereDao/matiereDao");

const createMatiere = async (matiereData) => {
  return await matiereDao.createMatiere(matiereData);
};

const getMatieres = async () => {
  return await matiereDao.getMatieres();
};

const updateMatiere = async (id, updateData) => {
  return await matiereDao.updateMatiere(id, updateData);
};

const deleteMatiere = async (id) => {
  return await matiereDao.deleteMatiere(id);
};

module.exports = {
  createMatiere,
  getMatieres,
  updateMatiere,
  deleteMatiere,
};
