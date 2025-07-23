const observationDao = require("../../dao/observationDao/observationDao");
const globalFunctions = require("../../utils/globalFunctions");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const fs = require("fs");
const smsService = require("../smsServices/smsServices");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");

const createObservation = async (observationData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);

  const observation = await observationDao.createObservation(observationData);
  let settings = await smsSettingsDao.getSmsSettings();
  let observation_sms_service = settings.filter(
    (service) => service.service_name === "Observations"
  );
  if (observation_sms_service[0].sms_status === "1") {
    let eleves = [];
    for (const classe of observation.classe) {
      let studentsByClass = await etudiantDao.getEtudiantsByClasseId(classe);
      eleves.push(studentsByClass);
    }

    let parents = [];

    for (const studentsByClass of eleves) {
      for (const student of studentsByClass) {
        console.log("student: ", student);
        parents.push({
          phone: student.parent.phone,
          msg: "Il ya une nouvelle observation, vous pouvez la consulter en visitant l'application SLS Sousse.",
        });
      }
    }

    smsService.sendSms(parents);
  }

  // Notification
  let students = [];
  let eleves = [];
  let onesignal_notifications = [];
  for (const classe of observation.classe) {
    let studentsByClass = await etudiantDao.getEtudiantsByClasseId(classe._id);
    eleves.push(studentsByClass);
  }
  for (const studentsByClass of eleves) {
    for (const eleve of studentsByClass) {
      students.push({
        id: eleve._id,
        notif_status: "0",
      });
    }
  }
  const notif = await notificationService.createNotification({
    eleve: students,
    titre: `Observation`,
    description: `Observation: ${observation.titre}`,
    key: "observations",
  });
  for (const eleve of students) {
    let etudiant = await etudiantDao.getEtudiantById(eleve.id);
    let notificationBody = {
      contents: `Observation pour la classe : ${etudiant.classe.nom_classe}`,
      title: `Une nouvelle Observation`,
      key: "observations",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
      // users: ["b0d09a32-652a-4c73-95b7-e41fed538d0b"],
    };

    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);

  return observation;
};

const getObservations = async () => {
  return await observationDao.getObservations();
};

async function saveDocumentsToServer(documents) {
  let counter = 0;
  for (const file of documents) {
    await saveFile(file.base64String, file.name, file.path);
    counter++;
    console.log("File number " + counter + " saved");
  }
  if (counter == documents.length) return true;
}

async function saveFile(base64String, fileName, file_path) {
  if (base64String != undefined) {
    const binaryData = Buffer.from(base64String, "base64");
    const filePath = file_path + fileName;
    await globalFunctions.ensureDirectoryExistence(file_path);
    fs.writeFile(filePath, binaryData, "binary", (err) => {
      if (err) {
        console.error("Error saving the file:", err);
      } else {
        console.log("File saved successfully!");
      }
    });
  }
}

const deleteObservation = async (id) => {
  return await observationDao.deleteObservation(id);
};

const getObservationsByClasseId = async (classeId) => {
  return await observationDao.getObservationsByClasseId(classeId);
};

const updateObservation = async (id, updateData) => {
  return await observationDao.updateObservation(id, updateData);
};

module.exports = {
  createObservation,
  getObservations,
  deleteObservation,
  getObservationsByClasseId,
  updateObservation,
};
