const calendrierDao = require("../../dao/calendrierDao/calendrierDao");
const smsService = require("../smsServices/smsServices");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");

const createCalendrier = async (calendrierData) => {
  const calendrier = await calendrierDao.createCalendrier(calendrierData);
  let settings = await smsSettingsDao.getSmsSettings();
  let calendrier_sms_service = settings.filter(
    (service) => service.service_name === "Devoirs"
  );
  if (calendrier_sms_service[0].sms_status === "1") {
    let receivers = [];

    let eleves = await etudiantDao.getEtudiantsByClasseId(
      calendrierData.classe
    );

    for (const eleve of eleves) {
      receivers.push({
        phone: eleve.parent.phone,
        msg: `${eleve.prenom} ${eleve.nom} ${eleve.classe.nom_classe}, %0AVotre enfant a un devoir de ${calendrierData.type} en ${calendrierData.matiere} le ${calendrierData.date} à ${calendrierData.heure_debut}`,
      });
    }
    // console.log(receivers);
    smsService.sendSms(receivers);
  }
  return calendrier;
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
