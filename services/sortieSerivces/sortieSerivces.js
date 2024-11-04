const sortieDao = require("../../dao/sortieDao/sortieDao");

const createSortie = async (retardData) => {
  return await sortieDao.createSortie(retardData);
};

const getSorties = async () => {
  return await sortieDao.getSorties();
};

const updateSortie = async (id, updateData) => {
  return await sortieDao.updateSortie(id, updateData);
};

const deleteSortie = async (id) => {
  return await sortieDao.deleteSortie(id);
};

const getSortiesByEleveId = async (eleveId) => {
  return await sortieDao.getSortiesByEleveId(eleveId);
};

module.exports = {
  createSortie,
  getSorties,
  updateSortie,
  deleteSortie,
  getSortiesByEleveId,
};
