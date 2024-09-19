const emploiDao = require("../../dao/EmploiDao/emploiDao");
const globalFunctions = require("../../utils/globalFunctions");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const fs = require("fs");

const createEmploi = async (emploiData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);

  const emploi = await emploiDao.createEmploi(emploiData);
  let eleves = [];

  let studentsByClass = await etudiantDao.getEtudiantsByClasseId(emploi.classe);
  eleves.push(studentsByClass);

  let parentsOneSignalKeys = [];
  let studentIds = [];

  for (const studentsByClass of eleves) {
    for (const student of studentsByClass) {
      parentsOneSignalKeys.push(student.parent.onesignal_api_key);
      studentIds.push(student._id);
    }
  }

  const notif = await notificationService.createNotification({
    eleve: studentIds,
    lu: "0",
    titre: `Emploi : ${emploi.classe.nom_classe}`,
    description: `Emploi Pour élèves de ${emploi.classe.nom_classe}`,
  });

  await onesignalService.sendNotification({
    contents: `Emploi Pour élèves de ${emploi.classe.nom_classe}`,
    title: `Emploi : ${emploi.classe.nom_classe}`,
    key: "emplois",
    notificationId: notif._id,
    users: parentsOneSignalKeys,
  });

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
  //   updateExercice,
};
