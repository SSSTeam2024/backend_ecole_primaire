const disciplineDao = require("../../dao/disciplineDao/disciplineDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

const createDiscipline = async (disciplineData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await disciplineDao.createDiscipline(disciplineData);
};

const getDisciplines = async () => {
  return await disciplineDao.getDisciplines();
};

// const deleteExercice = async (id) => {
//   return await exerciceDao.deleteExercice(id);
// };

// const updateExercice = async (id, updateData, documents) => {
//   let saveResult = await saveDocumentsToServer(documents);
//   return await exerciceDao.updateExercice(id, updateData);
// };

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
  createDiscipline,
  getDisciplines,
  //   deleteExercice,
  //   updateExercice,
};
