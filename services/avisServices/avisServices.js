const avisDao = require("../../dao/avisDao/avisDao");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const smsService = require("../smsServices/smsServices");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");

const createAvis = async (avisData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  const avis = await avisDao.createAvis(avisData);

  let settings = await smsSettingsDao.getSmsSettings();
  let avis_sms_service = settings.filter(
    (service) => service.service_name === "Avis"
  );

  if (avis_sms_service[0].sms_status === "1") {
    let eleves = [];
    for (const classe of avis.classes) {
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
          msg: "Un nouvel avis est disponible, consultez-le maintenant",
        });
      }
    }
    // console.log(parents);
    smsService.sendSms(parents);
  }

  // Notification
  let students = [];
  let eleves = [];
  let onesignal_notifications = [];
  for (const classe of avis.classes) {
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
    titre: `Avis`,
    description: `Avis: ${avis.titre}`,
    key: "avis",
  });
  for (const eleve of students) {
    let etudiant = await etudiantDao.getEtudiantById(eleve.id);
    let notificationBody = {
      contents: `Avis: ${avis.titre}`,
      title: `Un Nouvel Avis`,
      key: "avis",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
      // users: ["b0d09a32-652a-4c73-95b7-e41fed538d0b"],
    };

    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);

  return avis;
};

const getAvis = async () => {
  return await avisDao.getAvis();
};

const deleteAvis = async (id) => {
  return await avisDao.deleteAvis(id);
};

const updateAvis = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await avisDao.updateAvis(id, updateData);
};

const getAvisByClasseId = async (classeId) => {
  return await avisDao.getAvisByClasseId(classeId);
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
  createAvis,
  getAvis,
  deleteAvis,
  updateAvis,
  getAvisByClasseId,
};
