const retardDao = require("../../dao/retardDao/retardDao");

const createRetard = async (retardData) => {
  return await retardDao.createRetard(retardData);
};

const getRetards = async () => {
  return await retardDao.getRetards();
};

const updateRetard = async (id, updateData) => {
  return await retardDao.updateRetard(id, updateData);
};

const deleteRetard = async (id) => {
  return await retardDao.deleteRetard(id);
};

const getRetardByEleveId = async (eleveId) => {
  return await retardDao.getRetardsByEleveId(eleveId);
};

module.exports = {
  createRetard,
  getRetards,
  updateRetard,
  deleteRetard,
  getRetardByEleveId,
};
