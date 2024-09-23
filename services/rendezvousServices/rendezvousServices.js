const rendezvousDao = require("../../dao/rendezvousDao/rendezvousDao");
const smsService = require("../smsServices/smsServices");
const parentDao = require("../../dao/parentDao/parentDao");

const createRendezvous = async (rendezvousData) => {
  let rendezVous = await rendezvousDao.createRendezvous(rendezvousData);
  let parents = [];
  if (rendezvousData.createdBy === "administration") {
    for (const parent of rendezVous.parents) {
      let parentById = await parentDao.getParentById(parent);
      parents.push({
        phone: parent.phone,
        msg: `Bonjour ${parentById.prenom_parent} ${parentById.nom_parent}, %0AVous avez un rendez-vous le ${rendezVous.date} à ${rendezVous.heure}`,
      });
    }
  }
  console.log(parents);
  // smsService.sendSms(parents);
  return rendezVous;
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

const getRendezvousByParentId = async (parentId) => {
  return await rendezvousDao.getRendezvousByParentId(parentId);
};

module.exports = {
  createRendezvous,
  getRendezvous,
  updateRendezvous,
  deleteRendezvous,
  getRendezvousByParentId,
};
