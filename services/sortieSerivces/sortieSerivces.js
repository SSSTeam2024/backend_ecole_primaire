const sortieDao = require("../../dao/sortieDao/sortieDao");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");
const parentDao = require("../../dao/parentDao/parentDao");
const smsService = require("../smsServices/smsServices");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");

const createSortie = async (sortieData) => {
  let sortie = await sortieDao.createSortie(sortieData);
  let settings = await smsSettingsDao.getSmsSettings();
  let sortie_sms_service = settings.filter(
    (service) => service.service_name === "Sortie"
  );

  if (sortie_sms_service[0].sms_status === "1") {
    let parents = [];
    let parentById = await parentDao.getParentById(sortie.id_eleve.parent);
    let parent = {
      phone: parentById.phone,
      msg: `Bonjour ${parentById.prenom_parent} ${parentById.nom_parent}, %0AVotre enfant ${sortie.id_eleve.prenom} a quitté le lycée à ${sortie.heure}`,
    };
    parents.push(parent);
    smsService.sendSms(parents);
  }

  // Notification;

  let students = [];

  let onesignal_notifications = [];

  students.push({
    id: sortie.id_eleve._id,
    notif_status: "0",
  });

  const notif = await notificationService.createNotification({
    eleve: students,
    titre: `Sortie`,
    description: `Sortie: Votre enfant ${sortie.id_eleve.prenom} a quitté le lycée à ${sortie.heure}`,
    key: "sorties",
  });

  for (const eleve of students) {
    let etudiant = await etudiantDao.getEtudiantById(eleve.id);
    let notificationBody = {
      contents: `Sortie: Votre enfant ${sortie.id_eleve.prenom} a quitté le lycée à ${sortie.heure}`,
      title: `Un nouveau sortie`,
      key: "sorties",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
    };

    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);

  return sortie;
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
