const avisDao = require("../../dao/avisDao/avisDao");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");

const createAvis = async (avisData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  const avis = await avisDao.createAvis(avisData);
  let eleves = [];
  for (const classe of avis.classes) {
    let studentsByClass = await etudiantDao.getEtudiantsByClasseId(classe._id);
    eleves.push(studentsByClass);
  }

  let parentsOneSignalKeys = [];
  let studentIds = [];

  for (const studentsByClass of eleves) {
    for (const student of studentsByClass) {
      parentsOneSignalKeys.push(student.parent.onesignal_api_key);
      studentIds.push(student._id);
    }
  }

  const notif = await notificationService.createNotification({
    eleve: studentIds, // contents: avis.desc,
    lu: "0", // title: avis.titre,
    titre: avis.titre,
    description: avis.desc,
  });

  await onesignalService.sendNotification({
    contents: avis.desc,
    title: avis.titre,
    key: "avis",
    notificationId: notif._id,
    users: parentsOneSignalKeys,
  });

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
