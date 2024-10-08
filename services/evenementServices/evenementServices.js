const evenementDao = require("../../dao/evenementDao/evenementDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const smsService = require("../smsServices/smsServices");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");

const createEvenement = async (evenementData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  let evenement = await evenementDao.createEvenement(evenementData);
  let settings = await smsSettingsDao.getSmsSettings();
  let evenement_sms_service = settings.filter(
    (service) => service.service_name === "Evènements"
  );
  if (evenement_sms_service[0].sms_status === "1") {
    let eleves = [];
    for (const classe of evenement.classes) {
      let studentsByClass = await etudiantDao.getEtudiantsByClasseId(
        classe._id
      );
      eleves.push(studentsByClass);
    }

    let parents = [];

    for (const studentsByClass of eleves) {
      for (const student of studentsByClass) {
        parents.push({
          phone: student.parent.phone,
          msg: `Un nouvel événement de type ${evenement.type} est désormais disponible`,
        });
      }
    }
    smsService.sendSms(parents);
  }
  // Notification
  let students = [];
  let eleves = [];
  let onesignal_notifications = [];
  for (const classe of evenement.classes) {
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
    titre: `Evènement`,
    description: `Evènement: ${evenement.titre}`,
    key: "events",
  });
  for (const eleve of students) {
    let etudiant = await etudiantDao.getEtudiantById(eleve.id);
    let notificationBody = {
      contents: `Evènement: ${evenement.titre}`,
      title: `Un nouvel événement`,
      key: "events",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
      // users: ["b0d09a32-652a-4c73-95b7-e41fed538d0b"],
    };

    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);
  return evenement;
};

const getEvenements = async () => {
  return await evenementDao.getEvenements();
};

const deleteEvenement = async (id) => {
  return await evenementDao.deleteEvenement(id);
};

const updateEvenement = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await evenementDao.updateEvenement(id, updateData);
};

const getEvenementsByClasseId = async (classeId) => {
  return await evenementDao.getEvenementsByClasseId(classeId);
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

module.exports = {
  createEvenement,
  getEvenements,
  deleteEvenement,
  updateEvenement,
  getEvenementsByClasseId,
};
