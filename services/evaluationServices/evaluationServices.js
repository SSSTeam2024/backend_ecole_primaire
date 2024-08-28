const evaluationDao = require("../../dao/evaluationDao/evaluationDao");

const createEvaluation = async (evaluationData) => {
  return await evaluationDao.createEvaluation(evaluationData);
};

const getEvaluations = async () => {
  return await evaluationDao.getEvaluations();
};

const updateEvaluation = async (id, updateData) => {
  return await evaluationDao.updateEvaluation(id, updateData);
};

const deleteEvaluation = async (id) => {
  return await evaluationDao.deleteEvaluation(id);
};

const getEvaluationsByEleveId = async (eleveId) => {
  return await evaluationDao.getEvaluationsByEleveId(eleveId);
};

module.exports = {
  createEvaluation,
  getEvaluations,
  updateEvaluation,
  deleteEvaluation,
  getEvaluationsByEleveId,
};
