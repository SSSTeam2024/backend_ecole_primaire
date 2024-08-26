const paiementDao = require("../../dao/paiementDao/paiementDao");

const createPaiement = async (paiementData) => {
  return await paiementDao.createPaiement(paiementData);
};

const getPaiements = async () => {
  return await paiementDao.getPaiements();
};

const updatePaiement = async (id, updateData) => {
  return await paiementDao.updatePaiement(id, updateData);
};

const deletePaiement = async (id) => {
  return await paiementDao.deletePaiement(id);
};

const getPaiementByEleveId = async (eleveId) => {
  return await paiementDao.getPaiementByEleveId(eleveId);
};

module.exports = {
  createPaiement,
  getPaiements,
  updatePaiement,
  deletePaiement,
  getPaiementByEleveId,
};
