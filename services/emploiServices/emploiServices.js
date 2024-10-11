const emploiDao = require("../../dao/EmploiDao/emploiDao");
const globalFunctions = require("../../utils/globalFunctions");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const smsService = require("../smsServices/smsServices");
const fs = require("fs");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");

const createEmploi = async (emploiData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);

  const emploi = await emploiDao.createEmploi(emploiData);
  let settings = await smsSettingsDao.getSmsSettings();
  let emplois_sms_service = settings.filter(
    (service) => service.service_name === "Emplois"
  );
  if (emplois_sms_service[0].sms_status === "1") {
    let eleves = [];
    let studentsByClass = await etudiantDao.getEtudiantsByClasseId(
      emploi.classe
    );
    eleves.push(studentsByClass);
    let parents = [];

    for (const studentsByClass of eleves) {
      for (const student of studentsByClass) {
        parents.push({
          phone: student.parent.phone,
          msg: `${student.prenom} ${student.nom} ${student.classe.nom_classe}, %0AVotre enfant a un nouveau emploi`,
        });
      }
    }

    smsService.sendSms(parents);
  }

  // Notification
  let students = [];
  let onesignal_notifications = [];
  let eleves = await etudiantDao.getEtudiantsByClasseId(emploi.classe);
  for (const eleve of eleves) {
    students.push({
      id: eleve._id,
      notif_status: "0",
    });
  }
  const notif = await notificationService.createNotification({
    eleve: students,
    titre: `Emploi`,
    description: `Emploi: ${emploi.classe.nom_classe}`,
    key: "emplois",
  });
  for (const eleve of students) {
    let etudiant = await etudiantDao.getEtudiantById(eleve.id);
    let notificationBody = {
      contents: `Emploi: ${emploi.classe.nom_classe}`,
      title: `Un Nouveau Emploi de temps`,
      key: "emplois",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
      // users: ["b0d09a32-652a-4c73-95b7-e41fed538d0b"],
    };

    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);

  return emploi;
};

const getEmplois = async () => {
  return await emploiDao.getEmplois();
};

const deleteEmploi = async (id) => {
  return await emploiDao.deleteEmploi(id);
};

const getEmploisByClasseId = async (classeId) => {
  return await emploiDao.getEmploisByClasseId(classeId);
};

const updateEmploi = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await emploiDao.updateEmploi(id, updateData);
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
  createEmploi,
  getEmplois,
  deleteEmploi,
  getEmploisByClasseId,
  updateEmploi,
};
