const noteDao = require("../../dao/notesDao/notesDao");
const eleveDao = require("../../dao/etudiantDao/etudiantDao");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");
const smsService = require("../smsServices/smsServices");

const createNote = async (noteData) => {
  const note = await noteDao.createNote(noteData);
  // const eleve = await eleveDao.getEtudiantById(note._id);
  let receivers = [];

  for (const eleveID of noteData.eleves) {
    let etudiant = await eleveDao.getEtudiantById(eleveID.eleve);
    receivers.push({
      phone: etudiant.parent.phone,
      msg: `${etudiant.prenom} ${etudiant.nom} ${etudiant.classe.nom_classe}, %0AMatière: ${noteData.matiere} .%0ADevoir de ${noteData.type} .%0AVotre enfant a obtenu une note ${eleveID.note}.`,
    });
  }

  smsService.sendSms(receivers);

  // const notif = await notificationService.createNotification({
  //   eleve: eleve,
  //   lu: "0",
  //   titre: `${eleve.prenom} ${eleve.nom}`,
  //   description: `Note: ${note.matiere} ${note.type} : ${note.note} en ${note.trimestre} `,
  // });

  // await onesignalService.sendNotification({
  //   contents: `Note: ${note.matiere} ${note.type} : ${note.note} en ${note.trimestre} `,
  //   title: `${note.eleve.prenom} ${note.eleve.nom}`,
  //   key: "notes",
  //   notificationId: notif._id,
  //   users: [eleve.parent.onesignal_api_key],
  // });

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
