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

const getMatieresByClasseId = async (classeId) => {
  return await matiereDao.getMatieresByClasseId(classeId);
};

const getMatieresByEtudiantId = async (etudiantId) => {
  return await matiereDao.getMatieresByEtudiantId(etudiantId);
};

module.exports = {
  createMatiere,
  getMatieres,
  updateMatiere,
  deleteMatiere,
  getMatieresByClasseId,
  getMatieresByEtudiantId,
};
