const inscriptionDao = require("../../dao/inscriptionDao/inscriptionDao");

const createInscription = async (inscriptionData) => {
  console.log("services", inscriptionData);
  return await inscriptionDao.createInscription(inscriptionData);
};

const getInscriptions = async () => {
  return await inscriptionDao.getInscriptions();
};

const updateInscription = async (id, updateData) => {
  return await inscriptionDao.updateInscription(id, updateData);
};

const deleteInscription = async (id) => {
  return await inscriptionDao.deleteInscription(id);
};

const updateInscriptionStatus = async (inscriptionData) => {
  console.log("services", inscriptionData);
  const { inscription_id, statusInscri } = inscriptionData;
  await inscriptionDao.updateInscriptionStatus(inscription_id, statusInscri);
  return "Inscription Status Up to date!!";
};

module.exports = {
  createInscription,
  getInscriptions,
  updateInscription,
  deleteInscription,
  updateInscriptionStatus,
};
