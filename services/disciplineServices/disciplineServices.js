const disciplineDao = require("../../dao/disciplineDao/disciplineDao");
const globalFunctions = require("../../utils/globalFunctions");
const eleveDao = require("../../dao/etudiantDao/etudiantDao");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const smsService = require("../smsServices/smsServices");
const fs = require("fs");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");

const createDiscipline = async (disciplineData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  const discipline = await disciplineDao.createDiscipline(disciplineData);
  const eleve = await eleveDao.getEtudiantById(discipline.eleve);
  let settings = await smsSettingsDao.getSmsSettings();
  let discipline_sms_service = settings.filter(
    (service) => service.service_name === "Disciplines"
  );
  if (discipline_sms_service[0].sms_status === "1") {
    let receivers = [
      {
        phone: eleve.parent.phone,
        msg: `${eleve.prenom} ${eleve.nom} ${eleve.classe.nom_classe}, %0A Votre enfant a un ${discipline.type} le ${discipline.date} car ${discipline.texte}`,
      },
    ];
    // console.log(receivers);
    smsService.sendSms(receivers);
  }
  // const notif = await notificationService.createNotification({
  //   eleve: discipline.eleve,
  //   lu: "0",
  //   titre: `Discipline__${discipline.type} :${eleve.prenom} ${eleve.nom}`,
  //   description: discipline.texte,
  // });

  // await onesignalService.sendNotification({
  //   contents: discipline.texte,
  //   title: `Discipline__${discipline.type} : ${eleve.prenom} ${eleve.nom}`,
  //   key: "disciplines",
  //   notificationId: notif._id,
  //   users: [eleve.parent.onesignal_api_key],
  // });

  return discipline;
};

const getDisciplines = async () => {
  return await disciplineDao.getDisciplines();
};

const deleteDiscipline = async (id) => {
  return await disciplineDao.deleteDiscipline(id);
};

const getDisciplineByEleveId = async (eleveId) => {
  return await disciplineDao.getDisciplinesByEleveId(eleveId);
};

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
  deleteDiscipline,
  getDisciplineByEleveId,
  //   updateExercice,
};
