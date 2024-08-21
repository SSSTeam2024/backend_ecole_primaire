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

// const deleteExercice = async (id) => {
//   return await Exercice.findByIdAndDelete(id);
// };

module.exports = {
  createNote,
  getNotes,
  //   updateExercice,
  //   deleteExercice,
};
