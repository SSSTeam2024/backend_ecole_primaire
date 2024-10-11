const Discipline = require("../../models/disciplineModel/disciplineModel");

const createDiscipline = async (disciplineData) => {
  return await Discipline.create(disciplineData);
};

const getDisciplines = async () => {
  return await Discipline.find().populate("eleve");
};

const updateDiscipline = async (id, updateData) => {
  return await Discipline.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDiscipline = async (id) => {
  return await Discipline.findByIdAndDelete(id);
};

const getDisciplinesByEleveId = async (eleveId) => {
  const query = {
    eleve: eleveId,
  };
  return await Discipline.find(query).populate("eleve");
};

module.exports = {
  createDiscipline,
  getDisciplines,
  updateDiscipline,
  deleteDiscipline,
  getDisciplinesByEleveId,
};
