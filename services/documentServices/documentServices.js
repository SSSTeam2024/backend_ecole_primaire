const documentDao = require("../../dao/documentsDao/documentsDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");
const smsService = require("../smsServices/smsServices");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");

const createDocument = async (documentData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  let document = await documentDao.createDocument(documentData);
  let settings = await smsSettingsDao.getSmsSettings();
  let document_sms_service = settings.filter(
    (service) => service.service_name === "Documents"
  );
  if (document_sms_service[0].sms_status === "1") {
    let eleves = [];
    for (const classe of document.classes) {
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
          msg: `Un nouveau document nommé ${document.titre} est maintenant disponible , voir plus de détails sur notre application`,
        });
      }
    }
    smsService.sendSms(parents);
  }

  // Notification
  let students = [];
  let eleves = [];
  let onesignal_notifications = [];
  for (const classe of document.classes) {
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
    titre: `Document`,
    description: `Document: ${document.titre}`,
    key: "documents",
  });
  for (const eleve of students) {
    let etudiant = await etudiantDao.getEtudiantById(eleve.id);
    let notificationBody = {
      contents: `Document: ${document.titre}`,
      title: `Un Nouveau Document`,
      key: "documents",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
    };

    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);

  return document;
};

const getDocuments = async () => {
  return await documentDao.getDocuments();
};

const deleteDocument = async (id) => {
  return await documentDao.deleteDocument(id);
};

const updateDocument = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await documentDao.updateDocument(id, updateData);
};

const getDocumentsByClasseId = async (classeId) => {
  return await documentDao.getDocumentsByClasseId(classeId);
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
  createDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
  getDocumentsByClasseId,
};
