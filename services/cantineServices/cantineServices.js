const cantineDao = require("../../dao/cantineDao/cantineDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

const createCantine = async (cantineData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await cantineDao.createCantine(cantineData);
};

const getCantines = async () => {
  return await cantineDao.getCantines();
};

const deleteCantine = async (id) => {
  return await cantineDao.deleteCantine(id);
};

const updateCantine = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await cantineDao.updateCantine(id, updateData);
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
  createCantine,
  getCantines,
  deleteCantine,
  updateCantine,
};
