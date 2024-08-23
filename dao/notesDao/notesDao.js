const Note = require("../../models/notesModel/noteModel");

const createNote = async (noteData) => {
  return await Note.create(noteData);
};

const getNotes = async () => {
  return await Note.find().populate("eleve").populate("matiere");
};

// const updateExercice = async (id, updateData) => {
//   return await Exercice.findByIdAndUpdate(id, updateData, { new: true });
// };

const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

const getNotesByEleveId = async (eleveId) => {
  const query = {
    eleve: eleveId,
  };
  return await Note.find(query).populate("eleve").populate("matiere");
};

module.exports = {
  createNote,
  getNotes,
  //   updateExercice,
  deleteNote,
  getNotesByEleveId,
};
