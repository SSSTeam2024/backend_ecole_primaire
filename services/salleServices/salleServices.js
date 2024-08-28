const salleDaoDao = require("../../dao/salleDao/salleDao");

const createSalle = async (salleData) => {
  return await salleDaoDao.createSalle(salleData);
};

const getSalles = async () => {
  return await salleDaoDao.getSalles();
};

const updateSalle = async (id, updateData) => {
  return await salleDaoDao.updateSalle(id, updateData);
};

const deleteSalle = async (id) => {
  return await salleDaoDao.deleteSalle(id);
};

module.exports = {
  createSalle,
  getSalles,
  updateSalle,
  deleteSalle,
};
