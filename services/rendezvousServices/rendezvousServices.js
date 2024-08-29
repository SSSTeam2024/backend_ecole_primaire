const rendezvousDao = require("../../dao/rendezvousDao/rendezvousDao");

const createRendezvous = async (rendezvousData) => {
  return await rendezvousDao.createRendezvous(rendezvousData);
};

const getRendezvous = async () => {
  return await rendezvousDao.getRendezvous();
};

const updateRendezvous = async (id, updateData) => {
  return await rendezvousDao.updateRendezvous(id, updateData);
};

const deleteRendezvous = async (id) => {
  return await rendezvousDao.deleteRendezvous(id);
};

const getRendezvousByEnseignantId = async (enseignantId) => {
  return await rendezvousDao.getRendezvousByEnseignantId(enseignantId);
};

module.exports = {
  createRendezvous,
  getRendezvous,
  updateRendezvous,
  deleteRendezvous,
  getRendezvousByEnseignantId,
};
