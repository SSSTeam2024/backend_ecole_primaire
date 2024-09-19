const absenceDao = require("../../dao/absenceDao/absenceDao");
const parentDao = require("../../dao/parentDao/parentDao");
// const smsService = require("../smsServices/smsServices");

const createAbsence = async (absenceData) => {
  const absence = await absenceDao.createAbsence(absenceData);
  const eleve = await eleveDao.getEtudiantById(discipline.eleve);

  const notif = await notificationService.createNotification({
    eleve: discipline.eleve,
    lu: "0",
    titre: `Discipline__${discipline.type} :${eleve.prenom} ${eleve.nom}`,
    description: discipline.texte,
  });

  await onesignalService.sendNotification({
    contents: discipline.texte,
    title: `Discipline__${discipline.type} : ${eleve.prenom} ${eleve.nom}`,
    key: "disciplines",
    notificationId: notif._id,
    users: [eleve.parent.onesignal_api_key],
  });
  return absence;
};

const getAbsences = async () => {
  let parents = await parentDao.getParents();
  return await absenceDao.getAbsences();
};

const updateAbsence = async (id, updateData) => {
  return await absenceDao.updateAbsence(id, updateData);
};

const deleteAbsence = async (id) => {
  return await absenceDao.deleteAbsence(id);
};

const getAbsencesByEleveId = async (eleveId) => {
  return await absenceDao.getAbsencesByEleveId(eleveId);
};

module.exports = {
  createAbsence,
  getAbsences,
  updateAbsence,
  deleteAbsence,
  getAbsencesByEleveId,
};
