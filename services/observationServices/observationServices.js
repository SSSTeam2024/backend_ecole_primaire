const observationDao = require("../../dao/observationDao/observationDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

const createObservation = async (observationData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await observationDao.createObservation(observationData);
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

module.exports = {
  createObservation,
  getObservations,
};
