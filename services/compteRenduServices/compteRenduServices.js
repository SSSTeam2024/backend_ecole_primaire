const compteRenduDao = require("../../dao/compteRenduDao/compteRenduDao");
const globalFunctions = require("../../utils/globalFunctions");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const fs = require("fs");

const createCompteRendu = async (compteRenduData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);

  const compteRendu = await compteRenduDao.createCompteRendu(compteRenduData);

  let eleves = [];

  let studentsByClass = await etudiantDao.getEtudiantsByClasseId(
    compteRendu.classe
  );
  eleves.push(studentsByClass);

  let parentsOneSignalKeys = [];
  let studentIds = [];

  for (const studentsByClass of eleves) {
    for (const student of studentsByClass) {
      parentsOneSignalKeys.push(student.parent.onesignal_api_key);
      studentIds.push(student._id);
    }
  }

  await onesignalService.sendNotification({
    contents: compteRendu.desc,
    title: `A faire : ${compteRendu.titre}`,
    key: "comptes-rendus",
    users: parentsOneSignalKeys,
  });
  await notificationService.createNotification({
    eleve: studentIds,
    lu: "0",
    titre: `A faire : ${compteRendu.titre}`,
    description: compteRendu.desc,
  });

  return compteRendu;
};

const getCompteRendus = async () => {
  return await compteRenduDao.getCompteRendus();
};

const deleteCompteRendu = async (id) => {
  return await compteRenduDao.deleteCompteRendu(id);
};

const updateCompteRendu = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await compteRenduDao.updateCompteRendu(id, updateData);
};

const getCompteRendusByClasseId = async (classeId) => {
  return await compteRenduDao.getCompteRendusByClasseId(classeId);
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
  createCompteRendu,
  getCompteRendus,
  deleteCompteRendu,
  updateCompteRendu,
  getCompteRendusByClasseId,
};
