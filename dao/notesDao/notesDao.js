const Note = require("../../models/notesModel/noteModel");

const createNote = async (noteData) => {
  const newNote = await Note.create(noteData);
  return await Note.findById(newNote._id).populate("eleve").populate("matiere");
};

const getNotes = async () => {
  return await Note.find().populate("eleve").populate("matiere");
};

const updateNote = async (id, updateData) => {
  return await Note.findByIdAndUpdate(id, updateData, { new: true });
};

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
  updateNote,
  deleteNote,
  getNotesByEleveId,
};
