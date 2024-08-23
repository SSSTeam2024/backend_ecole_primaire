const Exercice = require("../../models/exerciceModel/exerciceModel");

const createExercice = async (exerciceData) => {
  return await Exercice.create(exerciceData);
};

const getExercices = async () => {
  return await Exercice.find().populate("matiere").populate("classes");
};

const updateExercice = async (id, updateData) => {
  return await Exercice.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteExercice = async (id) => {
  return await Exercice.findByIdAndDelete(id);
};

const getExercicesByClasseId = async (classeId) => {
  const query = {
    classes: classeId,
  };
  return await Exercice.find(query).populate("classes").populate("matiere");
};

module.exports = {
  createExercice,
  getExercices,
  updateExercice,
  deleteExercice,
  getExercicesByClasseId,
};
