const Absence = require("../../models/absenceModel/absenceModel");

const createAbsence = async (noteData) => {
  return await Absence.create(noteData);
};

const getAbsences = async () => {
  return await Absence.find()
    .populate("eleve")
    .populate("matiere")
    .populate("enseignant");
};

// const updateExercice = async (id, updateData) => {
//   return await Exercice.findByIdAndUpdate(id, updateData, { new: true });
// };

const deleteAbsence = async (id) => {
  return await Absence.findByIdAndDelete(id);
};

module.exports = {
  createAbsence,
  getAbsences,
  //   updateExercice,
  deleteAbsence,
};
