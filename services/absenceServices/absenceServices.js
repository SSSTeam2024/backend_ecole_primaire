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

module.exports = {
  createAbsence,
  getAbsences,
  updateAbsence,
  deleteAbsence,
};
