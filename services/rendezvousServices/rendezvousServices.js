const rendezvousDao = require("../../dao/rendezvousDao/rendezvousDao");
const smsService = require("../smsServices/smsServices");
const parentDao = require("../../dao/parentDao/parentDao");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");
const createRendezvous = async (rendezvousData) => {
  let rendezVous = await rendezvousDao.createRendezvous(rendezvousData);
  let settings = await smsSettingsDao.getSmsSettings();
  let rendezVous_sms_service = settings.filter(
    (service) => service.service_name === "Rendez-vous"
  );
  if (rendezVous_sms_service[0].sms_status === "1") {
    if (rendezvousData.createdBy === "administration") {
      let parents = [];

      for (const parent of rendezVous.parents) {
        let parentById = await parentDao.getParentById(parent);
        parents.push({
          phone: parent.phone,
          msg: `Bonjour ${parentById.prenom_parent} ${parentById.nom_parent}, %0AVous devez visiter l'administration le ${rendezVous.date} à ${rendezVous.heure}`,
        });
      }
      smsService.sendSms(parents);
    }
    // console.log(parents);
  }
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
