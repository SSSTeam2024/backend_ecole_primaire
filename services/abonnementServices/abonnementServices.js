const abonnementDao = require("../../dao/abonnementDao/abonnementDao");

const createAbonnement = async (abonnementData) => {
  return await abonnementDao.createAbonnement(abonnementData);
};

const getAbonnements = async () => {
  return await abonnementDao.getAbonnements();
};

const updateAbonnement = async (id, updateData) => {
  return await abonnementDao.updateAbonnement(id, updateData);
};

const deleteAbonnement = async (id) => {
  return await abonnementDao.deleteAbonnement(id);
};

const getAbonnementByEleveId = async (eleveId) => {
  return await abonnementDao.getAbonnementsByEleveId(eleveId);
};

module.exports = {
  createAbonnement,
  getAbonnements,
  updateAbonnement,
  deleteAbonnement,
  getAbonnementByEleveId,
};
