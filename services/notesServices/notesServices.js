const noteDao = require("../../dao/notesDao/notesDao");

const createNote = async (noteData) => {
  return await noteDao.createNote(noteData);
};

const getNotes = async () => {
  return await noteDao.getNotes();
};

// const updateMatiere = async (id, updateData) => {
//   return await matiereDao.updateMatiere(id, updateData);
// };

// const deleteMatiere = async (id) => {
//   return await matiereDao.deleteMatiere(id);
// };

module.exports = {
  createNote,
  getNotes,
  //   updateMatiere,
  //   deleteMatiere,
};
