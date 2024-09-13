const Absence = require("../../models/absenceModel/absenceModel");

const createAbsence = async (noteData) => {
  return await Absence.create(noteData);
};

const getAbsences = async () => {
  return await Absence.find()
    .populate("eleve")
    // .populate("matiere")
    .populate("enseignant");
};

const updateAbsence = async (id, updateData) => {
  return await Absence.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAbsence = async (id) => {
  return await Absence.findByIdAndDelete(id);
};

const getAbsencesByEleveId = async (eleveId) => {
  const query = {
    eleve: eleveId,
  };
  return await Absence.find(query).populate("eleve").populate("matiere");
};

module.exports = {
  createAbsence,
  getAbsences,
  updateAbsence,
  deleteAbsence,
  getAbsencesByEleveId,
};
