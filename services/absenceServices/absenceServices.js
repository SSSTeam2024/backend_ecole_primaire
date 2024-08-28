const absenceDao = require("../../dao/absenceDao/absenceDao");

const createAbsence = async (absenceData) => {
  return await absenceDao.createAbsence(absenceData);
};

const getAbsences = async () => {
  return await absenceDao.getAbsences();
};

const updateAbsence = async (id, updateData) => {
  return await absenceDao.updateAbsence(id, updateData);
};

const deleteAbsence = async (id) => {
  return await absenceDao.deleteAbsence(id);
};

const getAbsencesByEleveId = async (eleveId) => {
  return await absenceDao.getAbsencesByEleveId(eleveId);
};

module.exports = {
  createAbsence,
  getAbsences,
  updateAbsence,
  deleteAbsence,
  getAbsencesByEleveId,
};
