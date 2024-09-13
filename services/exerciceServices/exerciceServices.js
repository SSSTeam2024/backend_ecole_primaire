const exerciceDao = require("../../dao/exercicesDao/exercicesDao");
const globalFunctions = require("../../utils/globalFunctions");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const fs = require("fs");

const createExercice = async (exerciceData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  const exercice = await exerciceDao.createExercice(exerciceData);
  let eleves = [];
  for (const classe of exercice.classes) {
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

  await onesignalService.sendNotification({
    contents: `Pour ${exercice.badge_date} ${exercice.desc}`,
    title: `Exercice : ${exercice.matiere}`,
    key: "exercices",
    users: parentsOneSignalKeys,
  });
  await notificationService.createNotification({
    eleve: studentIds,
    lu: "0",
    titre: `Exercice : ${exercice.matiere}`,
    description: `Pour ${exercice.badge_date} ${exercice.desc}`,
  });

  return exercice;
};

const getExercices = async () => {
  return await exerciceDao.getExercices();
};

const deleteExercice = async (id) => {
  return await exerciceDao.deleteExercice(id);
};

const getExercicesByClasseId = async (classeId) => {
  return await exerciceDao.getExercicesByClasseId(classeId);
};

const updateExercice = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await exerciceDao.updateExercice(id, updateData);
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
  createExercice,
  getExercices,
  deleteExercice,
  updateExercice,
  getExercicesByClasseId,
};
