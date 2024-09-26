const absenceDao = require("../../dao/absenceDao/absenceDao");
const parentDao = require("../../dao/parentDao/parentDao");
const smsService = require("../smsServices/smsServices");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");

const createAbsence = async (absenceData) => {
  const absence = await absenceDao.createAbsence(absenceData);
  let settings = await smsSettingsDao.getSmsSettings();
  let absence_sms_service = settings.filter(
    (service) => service.service_name === "Absences"
  );

  if (absence_sms_service[0].sms_status === "1") {
    let receivers = [];

    for (const eleveID of absenceData.eleves) {
      if (eleveID.typeAbsent !== "P") {
        let etudiant = await etudiantDao.getEtudiantById(eleveID.eleve);
        if (eleveID.typeAbsent === "A") {
          receivers.push({
            phone: etudiant.parent.phone,
            msg: `${etudiant.prenom} ${etudiant.nom} ${etudiant.classe.nom_classe}, %0AVotre enfant était absent en ${absenceData.matiere} à ${absenceData.heure}`,
          });
        }
        if (eleveID.typeAbsent === "R") {
          receivers.push({
            phone: etudiant.parent.phone,
            msg: `${etudiant.prenom} ${etudiant.nom} ${etudiant.classe.nom_classe}, %0AVotre enfant était en retard en ${absenceData.matiere} à ${absenceData.heure}`,
          });
        }
      }
    }
    // console.log(receivers);
    smsService.sendSms(receivers);
  }

  // Notification

  let students = [];
  let onesignal_notifications = [];
  let notif;
  let notifBody;
  for (const absence of absenceData.eleves) {
    if (absence.typeAbsent !== "P") {
      students.push({
        id: absence.eleve,
        notif_status: "0",
      });
      if (absence.typeAbsent === "A") {
        notifBody = {
          eleve: students,
          titre: `Absence: ${absenceData.matiere}`,
          description: `Absence: ${absenceData.matiere} le ${absenceData.date} à ${absenceData.heure}`,
          key: "absences",
        };
      }
      if (absence.typeAbsent === "R") {
        notifBody = {
          eleve: students,
          titre: `Retard: ${absenceData.matiere}`,
          description: `Retard: ${absenceData.matiere} le ${absenceData.date} à ${absenceData.heure}`,
          key: "absences",
        };
      }
      notif = await notificationService.createNotification(notifBody);

      for (const eleve of students) {
        let etudiant = await etudiantDao.getEtudiantById(eleve.id);
        if (absence.typeAbsent === "R") {
          let notificationBody = {
            contents: `Retard: ${absenceData.matiere} le ${absenceData.date} à ${absenceData.heure}`,
            title: `${etudiant.prenom} ${etudiant.nom}, Classe: ${etudiant.classe.nom_classe}`,
            key: "absences",
            notificationId: notif._id,
            users: [etudiant.parent.onesignal_api_key],
          };

          onesignal_notifications.push(notificationBody);
        }
        if (absence.typeAbsent === "A") {
          let notificationBody = {
            contents: `Absence: ${absenceData.matiere} le ${absenceData.date} à ${absenceData.heure}`,
            title: `${etudiant.prenom} ${etudiant.nom}, Classe: ${etudiant.classe.nom_classe}`,
            key: "absences",
            notificationId: notif._id,
            users: [etudiant.parent.onesignal_api_key],
          };

          onesignal_notifications.push(notificationBody);
        }
      }
    }
  }

  onesignalService.sendNotification(onesignal_notifications);

  return absence;
};

const getAbsences = async () => {
  let parents = await parentDao.getParents();
  return await absenceDao.getAbsences();
};

const updateAbsence = async (id, updateData) => {
  return await absenceDao.updateAbsence(id, updateData);
};

const deleteAbsence = async (id) => {
  return await absenceDao.deleteAbsence(id);
};

const getAbsencesByEleveId = async (eleveId) => {
  return await absenceDao.getAbsencesByEleveId(eleveId);
};

module.exports = {
  createAbsence,
  getAbsences,
  updateAbsence,
  deleteAbsence,
  getAbsencesByEleveId,
};
