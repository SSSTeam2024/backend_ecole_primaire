const Exercice = require("../../models/exerciceModel/exerciceModel");

const createExercice = async (exerciceData) => {
  const newExercice = await Exercice.create(exerciceData);
  return await Exercice.findById(newExercice._id).populate("classes");
};

const getExercices = async () => {
  return await Exercice.find().populate("classes");
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
