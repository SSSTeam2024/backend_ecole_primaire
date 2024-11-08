const retardDao = require("../../dao/retardDao/retardDao");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");
const parentDao = require("../../dao/parentDao/parentDao");
const smsService = require("../smsServices/smsServices");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");

const createRetard = async (retardData) => {
  let retard = await retardDao.createRetard(retardData);
  let settings = await smsSettingsDao.getSmsSettings();
  let Retard_sms_service = settings.filter(
    (service) => service.service_name === "Retard"
  );

  if (Retard_sms_service[0].sms_status === "1") {
    let parents = [];
    let parentById = await parentDao.getParentById(retard.id_eleve.parent);
    let parent = {
      phone: parentById.phone,
      msg: `Bonjour ${parentById.prenom_parent} ${parentById.nom_parent}, %0AVotre enfant ${retard.id_eleve.prenom} est arrivé en retard au lycée à ${retard.heure}`,
    };
    parents.push(parent);
    smsService.sendSms(parents);
  }

  // Notification;

  let students = [];

  let onesignal_notifications = [];

  students.push({
    id: retard.id_eleve._id,
    notif_status: "0",
  });

  const notif = await notificationService.createNotification({
    eleve: students,
    titre: `Retard`,
    description: `Retard: Votre enfant ${retard.id_eleve.prenom} est arrivé en retard au lycée à ${retard.heure}`,
    key: "retards",
  });

  for (const eleve of students) {
    let etudiant = await etudiantDao.getEtudiantById(eleve.id);
    let notificationBody = {
      contents: `Retard: Votre enfant ${retard.id_eleve.prenom} est arrivé en retard au lycée à ${retard.heure}`,
      title: `Un nouveau Retard`,
      key: "retards",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
    };

    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);

  return retard;
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
