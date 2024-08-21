const Discipline = require("../../models/disciplineModel/disciplineModel");

const createDiscipline = async (disciplineData) => {
  return await Discipline.create(disciplineData);
};

const getDisciplines = async () => {
  return await Discipline.find().populate("eleve");
};

// const updateExercice = async (id, updateData) => {
//   return await Exercice.findByIdAndUpdate(id, updateData, { new: true });
// };

// const deleteExercice = async (id) => {
//   return await Exercice.findByIdAndDelete(id);
// };

module.exports = {
  createDiscipline,
  getDisciplines,
  //   updateExercice,
  //   deleteExercice,
};
