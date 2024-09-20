const Absence = require("../../models/absenceModel/absenceModel");

const createAbsence = async (absenceData) => {
  return await Absence.create(absenceData);
};

const getAbsences = async () => {
  return await Absence.find()
    .populate("enseignant")
    .populate({
      path: "eleves",
      populate: {
        path: "eleve",
      },
    })
    .populate("classe");
};

const updateAbsence = async (id, updateData) => {
  return await Absence.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAbsence = async (id) => {
  return await Absence.findByIdAndDelete(id);
};

const getAbsencesByEleveId = async (eleveId) => {
  return await Absence.find({ "eleves.eleve": eleveId })
    .populate({
      path: "eleves",
      populate: {
        path: "eleve",
      },
    })
    .populate("classe")
    .populate("enseignant");
};

module.exports = {
  createAbsence,
  getAbsences,
  updateAbsence,
  deleteAbsence,
  getAbsencesByEleveId,
};
