const noteDao = require("../../dao/notesDao/notesDao");
const eleveDao = require("../../dao/etudiantDao/etudiantDao");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const smsService = require("../smsServices/smsServices");
const smsSettingsDao = require("../../dao/smsSettingDao/smsSettingDao");

const createNote = async (noteData) => {
  const note = await noteDao.createNote(noteData);

  //SMS
  let settings = await smsSettingsDao.getSmsSettings();
  let note_sms_service = settings.filter(
    (service) => service.service_name === "Notes"
  );
  if (note_sms_service[0].sms_status === "1") {
    let receivers = [];

    for (const eleveID of noteData.eleves) {
      let etudiant = await eleveDao.getEtudiantById(eleveID.eleve);
      receivers.push({
        phone: etudiant.parent.phone,
        msg: `${etudiant.prenom} ${etudiant.nom} ${etudiant.classe.nom_classe}, %0AMatière: ${noteData.matiere} .%0ADevoir de ${noteData.type} .%0AVotre enfant a obtenu une note ${eleveID.note}.`,
      });
    }

    smsService.sendSms(receivers);
  }
  // Notification
  let students = [];
  let onesignal_notifications = [];
  for (const note of noteData.eleves) {
    students.push(note.eleve);
  }
  const notif = await notificationService.createNotification({
    eleve: students,
    lu: "0",
    titre: `Note: ${note.matiere}`,
    description: `Note: ${note.matiere} ${note.type} en ${note.trimestre}`,
    key: "notes",
  });
  for (const eleve of students) {
    let etudiant = await eleveDao.getEtudiantById(eleve);
    let notificationBody = {
      contents: `Note: ${note.matiere} ${note.type} en ${note.trimestre}`,
      title: `${etudiant.prenom} ${etudiant.nom}, Classe: ${note.classe.nom_classe}`,
      key: "notes",
      notificationId: notif._id,
      users: [etudiant.parent.onesignal_api_key],
    };
    onesignal_notifications.push(notificationBody);
  }

  onesignalService.sendNotification(onesignal_notifications);
  return note;
};

const getNotes = async () => {
  return await noteDao.getNotes();
};

const updateNote = async (id, updateData) => {
  return await noteDao.updateNote(id, updateData);
};

const deleteNote = async (id) => {
  return await noteDao.deleteNote(id);
};

const getNotesByEleveId = async (eleveId) => {
  return await noteDao.getNotesByEleveId(eleveId);
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNotesByEleveId,
};
