const evenementDao = require("../../dao/evenementDao/evenementDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

const createEvenement = async (evenementData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await evenementDao.createEvenement(evenementData);
};

const getEvenements = async () => {
  return await evenementDao.getEvenements();
};

const deleteEvenement = async (id) => {
  return await evenementDao.deleteEvenement(id);
};

const updateEvenement = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await evenementDao.updateEvenement(id, updateData);
};

const getEvenementsByClasseId = async (classeId) => {
  return await evenementDao.getEvenementsByClasseId(classeId);
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
  createEvenement,
  getEvenements,
  deleteEvenement,
  updateEvenement,
  getEvenementsByClasseId,
};
