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

const deleteNote = async (id) => {
  return await noteDao.deleteNote(id);
};

const getNotesByEleveId = async (eleveId) => {
  return await noteDao.getNotesByEleveId(eleveId);
};

module.exports = {
  createNote,
  getNotes,
  //   updateMatiere,
  deleteNote,
  getNotesByEleveId,
};
