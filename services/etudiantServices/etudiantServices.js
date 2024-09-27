const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

const createEtudiant = async (etudiantData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await etudiantDao.createEtudiant(etudiantData);
};

const getEtudiants = async () => {
  return await etudiantDao.getEtudiants();
};

const getEtudiantById = async (id) => {
  return await etudiantDao.getEtudiantById(id);
};

const deleteEtudiant = async (id) => {
  return await etudiantDao.deleteEtudiant(id);
};

const updateEtudiant = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  if (updateData.parent) {
    await etudiantDao.updateEtudiantParentAssignment(id, updateData.parent);
  }
  return await etudiantDao.updateEtudiant(id, updateData);
};

const getEtudiantsByClasseId = async (classeId) => {
  return await etudiantDao.getEtudiantsByClasseId(classeId);
};

const updateStatusPaiemnt = async (etudiantData) => {
  const { etudiant_id, paiement } = etudiantData;
  await etudiantDao.updateStatusPaiement(etudiant_id, paiement);
  return "Payment Status Up to date!!";
};

const updateEtudiantClasse = async (etudiantData) => {
  const { eleve_id, groupeId } = etudiantData;
  await etudiantDao.updateEtudiantClasse(eleve_id, groupeId);
  return "Etudiant Classe Up to date!!";
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
  createEtudiant,
  getEtudiants,
  getEtudiantById,
  deleteEtudiant,
  updateEtudiant,
  getEtudiantsByClasseId,
  updateStatusPaiemnt,
  updateEtudiantClasse,
};
