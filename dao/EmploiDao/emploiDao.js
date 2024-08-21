const Emploi = require("../../models/emploiModel/emploiModel");

const createEmploi = async (disciplineData) => {
  return await Emploi.create(disciplineData);
};

const getEmplois = async () => {
  return await Emploi.find();
};

// const updateExercice = async (id, updateData) => {
//   return await Exercice.findByIdAndUpdate(id, updateData, { new: true });
// };

// const deleteExercice = async (id) => {
//   return await Exercice.findByIdAndDelete(id);
// };

module.exports = {
  createEmploi,
  getEmplois,
  //   updateExercice,
  //   deleteExercice,
};
