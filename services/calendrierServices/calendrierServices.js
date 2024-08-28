const calendrierDao = require("../../dao/calendrierDao/calendrierDao");

const createCalendrier = async (calendrierData) => {
  return await calendrierDao.createCalendrier(calendrierData);
};

const getCalendriers = async () => {
  return await calendrierDao.getCalendriers();
};

const deleteCalendrier = async (id) => {
  return await calendrierDao.deleteCalendrier(id);
};

const updateCalendrier = async (id, updateData) => {
  return await calendrierDao.updateCalendrier(id, updateData);
};

const getCalendriersByClasseId = async (classeId) => {
  return await calendrierDao.getCalendriersByClasseId(classeId);
};

module.exports = {
  createCalendrier,
  getCalendriers,
  deleteCalendrier,
  updateCalendrier,
  getCalendriersByClasseId,
};
