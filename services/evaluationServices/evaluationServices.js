const evaluationDao = require("../../dao/evaluationDao/evaluationDao");
const eleveDao = require("../../dao/etudiantDao/etudiantDao");
const onesignalService = require("../oneSignalServices/oneSignalServices");
const notificationService = require("../notificationServices/notificationService");

const createEvaluation = async (evaluationData) => {
  const evaluation = await evaluationDao.createEvaluation(evaluationData);
  const eleve = await eleveDao.getEtudiantById(evaluation.eleve);

  await onesignalService.sendNotification({
    contents: `Au ${evaluation.trimestre}, votre fils a eu une note ${evaluation.note} en ${evaluation.matiere.nom_matiere}`,
    title: `Evaluation : ${evaluation.eleve.prenom} ${evaluation.eleve.nom}`,
    key: "evaluations",
    users: [eleve.parent.onesignal_api_key],
  });
  await notificationService.createNotification({
    eleve: evaluation.eleve,
    lu: "0",
    titre: `Evaluation : ${evaluation.eleve.prenom} ${evaluation.eleve.nom}`,
    description: `Au ${evaluation.trimestre}, votre fils a eu une note ${evaluation.note} en ${evaluation.matiere.nom_matiere}`,
  });

  return evaluation;
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
