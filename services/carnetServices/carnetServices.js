const carnetDao = require("../../dao/carnetDao/carnetDao");
const globalFunctions = require("../../utils/globalFunctions");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const fs = require("fs");
const smsService = require("../smsServices/smsServices");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");

const createCarnet = async (carnetData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  const bulletin = await carnetDao.createCarnet(carnetData);
  let settings = await smsSettingsDao.getSmsSettings();
  let carnet_sms_service = settings.filter(
    (service) => service.service_name === "Bulletins"
  );
  if (carnet_sms_service[0].sms_status === "1") {
    let receivers = [];

    for (const eleveID of carnetData.eleves) {
      let etudiant = await etudiantDao.getEtudiantById(eleveID.eleve);
      receivers.push({
        phone: etudiant.parent.phone,
        msg: `${etudiant.prenom} ${etudiant.nom} ${etudiant.classe.nom_classe}, %0AVotre enfant a obtenu une moyenne ${eleveID.note} sur 20 au cours du ${carnetData.trimestre}`,
      });
    }
    await smsService.sendSms(receivers);
  }

  let students = [];
  let onesignal_notifications = [];
  for (const carnet of carnetData.eleves) {
    students.push({
      id: carnet.eleve,
      notif_status: "0",
    });
  }
  const notif = await notificationService.createNotification({
    eleve: students,
    titre: `Bulletin`,
    description: `Bulletin du ${bulletin.trimestre}`,
    key: "carnets",
  });
  for (const eleve of carnetData.eleves) {
    let etudiant = await etudiantDao.getEtudiantById(eleve.eleve);
    let notificationBody = {
      contents: `Votre enfant a obtenu une moyenne ${eleve.note} sur 20 au cours du ${carnetData.trimestre}`,
      title: `${etudiant.prenom} ${etudiant.nom}, Classe: ${etudiant.classe.nom_classe}`,
      key: "carnets",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
    };
    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);

  return bulletin;
};

const getCarnets = async () => {
  return await carnetDao.getCarnets();
};

const deleteCarnet = async (id) => {
  return await carnetDao.deleteCarnet(id);
};

const getCarnetsByEleveId = async (eleveId) => {
  return await carnetDao.getCarnetsByEleveId(eleveId);
};

const updateCarnet = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await carnetDao.updateCarnet(id, updateData);
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
  createCarnet,
  getCarnets,
  deleteCarnet,
  getCarnetsByEleveId,
  updateCarnet,
};
