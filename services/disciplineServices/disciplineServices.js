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
  let eleves = [];
  let receivers = [];
  for (const etudiant of disciplineData.eleve) {
    const student = await eleveDao.getEtudiantById(etudiant);
    eleves.push(student);
  }
  let settings = await smsSettingsDao.getSmsSettings();
  let discipline_sms_service = settings.filter(
    (service) => service.service_name === "Disciplines"
  );
  if (discipline_sms_service[0].sms_status === "1") {
    for (const eleve of eleves) {
      receivers.push({
        phone: eleve.parent.phone,
        msg: `${eleve.prenom} ${eleve.nom} ${eleve.classe.nom_classe}, %0A Votre enfant a un ${discipline.type} le ${discipline.date} car ${discipline.texte}`,
      });
    }

    // console.log(receivers);
    smsService.sendSms(receivers);
  }

  // Notification
  let students = [];
  let onesignal_notifications = [];
  for (const eleve of eleves) {
    students.push({
      id: eleve._id,
      notif_status: "0",
    });
  }

  const notif = await notificationService.createNotification({
    eleve: students,
    titre: `Discipline`,
    description: `Discipline: ${discipline.type} le ${discipline.date}`,
    key: "disciplines",
  });

  for (const eleve of eleves) {
    onesignal_notifications.push({
      contents: `Discipline: ${discipline.type} le ${discipline.date}`,
      title: `${eleve.prenom} ${eleve.nom} ${eleve.classe.nom_classe}, a un ${discipline.type}`,
      key: "disciplines",
      notificationId: notif._id,
      users: [eleve.parent.onesignal_api_key],
    });
  }
  onesignalService.sendNotification(onesignal_notifications);

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

const updateDiscipline = async (id, updateData, documents) => {
  let saveResult = await saveDocumentsToServer(documents);
  return await disciplineDao.updateDiscipline(id, updateData);
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
  createDiscipline,
  getDisciplines,
  deleteDiscipline,
  getDisciplineByEleveId,
  updateDiscipline,
};
