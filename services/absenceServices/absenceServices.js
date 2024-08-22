const absenceDao = require("../../dao/absenceDao/absenceDao");

const createAbsence = async (absenceData) => {
  return await absenceDao.createAbsence(absenceData);
};

const getAbsences = async () => {
  return await absenceDao.getAbsences();
};

// const updateMatiere = async (id, updateData) => {
//   return await matiereDao.updateMatiere(id, updateData);
// };

const deleteAbsence = async (id) => {
  return await absenceDao.deleteAbsence(id);
};

module.exports = {
  createAbsence,
  getAbsences,
  //   updateMatiere,
  deleteAbsence,
};
