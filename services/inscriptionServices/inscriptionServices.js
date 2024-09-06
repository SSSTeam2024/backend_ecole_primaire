const inscriptionDao = require("../../dao/inscriptionDao/inscriptionDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

const createInscription = async (inscriptionData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await inscriptionDao.createInscription(inscriptionData);
};

const getInscriptions = async () => {
  return await inscriptionDao.getInscriptions();
};

const updateInscription = async (id, updateData) => {
  return await inscriptionDao.updateInscription(id, updateData);
};

const deleteInscription = async (id) => {
  return await inscriptionDao.deleteInscription(id);
};

const updateInscriptionStatus = async (inscriptionData) => {
  const { inscription_id, statusInscri } = inscriptionData;
  await inscriptionDao.updateInscriptionStatus(inscription_id, statusInscri);
  return "Inscription Status Up to date!!";
};

const updateInscriptionGroupe = async (inscriptionData) => {
  const { inscription_id, groupeInscri } = inscriptionData;
  await inscriptionDao.updateInscriptionGroupe(inscription_id, groupeInscri);
  return "Inscription Groupe Up to date!!";
};

const updateInscriptionNotes = async (inscriptionData) => {
  const { inscription_id, notesInscri } = inscriptionData;
  await inscriptionDao.updateInscriptionNotes(inscription_id, notesInscri);
  return "Inscription Groupe Up to date!!";
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
  createInscription,
  getInscriptions,
  updateInscription,
  deleteInscription,
  updateInscriptionStatus,
  updateInscriptionGroupe,
  updateInscriptionNotes,
};
