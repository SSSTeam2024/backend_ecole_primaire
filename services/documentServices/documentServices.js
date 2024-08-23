const documentDao = require("../../dao/documentsDao/documentsDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

const createDocument = async (documentData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await documentDao.createDocument(documentData);
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
