const Note = require("../../models/notesModel/noteModel");

const createNote = async (noteData) => {
  const newNote = await Note.create(noteData);
  return await Note.findById(newNote._id)
    .populate({
      path: "eleves",
      populate: {
        path: "eleve",
      },
    })
    .populate("classe");
};

const getNotes = async () => {
  return await Note.find()
    .populate({
      path: "eleves",
      populate: {
        path: "eleve",
      },
    })
    .populate("classe");
};

const updateNote = async (id, updateData) => {
  return await Note.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

const getNotesByEleveId = async (eleveId) => {
  // const query = {
  //   eleve: eleveId,
  // };
  return await Note.find({ "eleves.eleve": eleveId })
    .populate({
      path: "eleves",
      populate: {
        path: "eleve",
      },
    })
    .populate("classe");
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNotesByEleveId,
};
