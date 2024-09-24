const gallerieDao = require("../../dao/gallerieDao/gallerieDao");
const globalFunctions = require("../../utils/globalFunctions");
const fs = require("fs");

const etudiantDao = require("../../dao/etudiantDao/etudiantDao");
const smsService = require("../smsServices/smsServices");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");

const createGallerie = async (gallerieData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  let gallerie = await gallerieDao.createGallerie(gallerieData);
  let settings = await smsSettingsDao.getSmsSettings();
  let galerie_sms_service = settings.filter(
    (service) => service.service_name === "Galeries"
  );
  if (galerie_sms_service[0].sms_status === "1") {
    let eleves = [];
    for (const classe of gallerie.classes) {
      let studentsByClass = await etudiantDao.getEtudiantsByClasseId(
        classe._id
      );
      eleves.push(studentsByClass);
    }

    let parents = [];

    for (const studentsByClass of eleves) {
      for (const student of studentsByClass) {
        parents.push({
          phone: student.parent.phone,
          msg: `Une nouvelle galerie est désormais disponible, vous pouvez la consulter dès maintenant sur l'application SLS Sousse`,
        });
      }
    }
    // console.log(parents);
    smsService.sendSms(parents);
  }
  return gallerie;
};

const getGalleries = async () => {
  return await gallerieDao.getGalleries();
};

const deleteGallerie = async (id) => {
  return await gallerieDao.deleteGallerie(id);
};

const updateGallerie = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await gallerieDao.updateGallerie(id, updateData);
};

const getGalleriesByClasseId = async (classeId) => {
  return await gallerieDao.getGalleriesByClasseId(classeId);
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
  createGallerie,
  getGalleries,
  deleteGallerie,
  updateGallerie,
  getGalleriesByClasseId,
};
