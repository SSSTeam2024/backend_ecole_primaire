const classeDao = require("../../dao/classeDao/classeDao");

const createClasse = async (classeData) => {
  return await classeDao.createClasse(classeData);
};

const getClasses = async () => {
  return await classeDao.getClasses();
};

// const getEtudiantById = async (id) => {
//   return await etudiantDao.getEtudiantById(id);
// };

// const deleteEtudiant = async (id) => {
//   return await etudiantDao.deleteEtudiant(id);
// };

// const updateEtudiant = async (id, updateData) => {
//   return await etudiantDao.updateEtudiant(id, updateData);
// };

module.exports = {
  createClasse,
  getClasses,
};
