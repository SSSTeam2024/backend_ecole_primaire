const observationDao = require("../../dao/observationDao/observationDao");
const globalFunctions = require("../../utils/globalFunctions");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const fs = require("fs");
const smsService = require("../smsServices/smsServices");

const createObservation = async (observationData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);

  const observation = await observationDao.createObservation(observationData);
  let eleves = [];
  for (const classe of observation.classe) {
    let studentsByClass = await etudiantDao.getEtudiantsByClasseId(classe);
    eleves.push(studentsByClass);
  }

  let parents = [];

  for (const studentsByClass of eleves) {
    for (const student of studentsByClass) {
      parents.push({
        phone: student.parent.phone,
        msg: "Il ya une nouvelle observation, vous pouvez la consulter en visitant l'application SLS Sousse.",
      });
    }
  }
  // console.log(parents);
  smsService.sendSms(parents);
  // let eleves = [];

  // let studentsByClass = await etudiantDao.getEtudiantsByClasseId(
  //   observation.classe
  // );
  // eleves.push(studentsByClass);

  // let parentsOneSignalKeys = [];
  // let studentIds = [];

  // for (const studentsByClass of eleves) {
  //   for (const student of studentsByClass) {
  //     parentsOneSignalKeys.push(student.parent.onesignal_api_key);
  //     studentIds.push(student._id);
  //   }
  // }

  // const notif = await notificationService.createNotification({
  //   eleve: studentIds,
  //   lu: "0",
  //   titre: `Observation : ${observation.titre}`,
  //   description: observation.description,
  // });

  // await onesignalService.sendNotification({
  //   contents: observation.description,
  //   title: `Observation : ${observation.titre}`,
  //   key: "observations",
  //   notificationId: notif._id,
  //   users: parentsOneSignalKeys,
  // });

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

module.exports = {
  createObservation,
  getObservations,
  deleteObservation,
  getObservationsByClasseId,
};
