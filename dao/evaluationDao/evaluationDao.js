const Evaluation = require("../../models/evaluationModel/evaluationModel");

const createEvaluation = async (evaluationData) => {
  const newEvaluation = await Evaluation.create(evaluationData);
  return await Evaluation.findById(newEvaluation._id)
    .populate("eleve")
    .populate("matiere");
};

const getEvaluations = async () => {
  return await Evaluation.find().populate("eleve").populate("matiere");
};

const updateEvaluation = async (id, updateData) => {
  return await Evaluation.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEvaluation = async (id) => {
  return await Evaluation.findByIdAndDelete(id);
};

const getEvaluationsByEleveId = async (eleveId) => {
  const query = {
    eleve: eleveId,
  };
  return await Evaluation.find(query).populate("eleve").populate("matiere");
};

module.exports = {
  createEvaluation,
  getEvaluations,
  updateEvaluation,
  deleteEvaluation,
  getEvaluationsByEleveId,
};
