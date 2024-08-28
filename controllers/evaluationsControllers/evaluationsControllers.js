const evaluationServices = require("../../services/evaluationServices/evaluationServices");

const createEvaluation = async (req, res) => {
  try {
    const { eleve, matiere, trimestre, note, date } = req.body;
    const newEvaluation = await evaluationServices.createEvaluation({
      eleve,
      matiere,
      trimestre,
      note,
      date,
    });
    res.status(201).json(newEvaluation);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEvaluations = async (req, res) => {
  try {
    const evaluations = await evaluationServices.getEvaluations();
    res.json(evaluations);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEvaluationsByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const evaluations = await evaluationServices.getEvaluationsByEleveId(
      eleveId
    );

    if (!evaluations) {
      return res.status(404).send("Evaluation not found");
    }

    res.json(evaluations);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateEvaluation = async (req, res) => {
  try {
    const evaluationId = req.params.id;
    const { eleve, matiere, trimestre, note, date } = req.body;

    const updateEvaluation = await evaluationServices.updateEvaluation(
      evaluationId,
      {
        eleve,
        matiere,
        trimestre,
        type,
        note,
        date,
      }
    );

    if (!updateEvaluation) {
      return res.status(404).send("Evaluation not found");
    }
    res.json(updateEvaluation);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEvaluation = async (req, res) => {
  try {
    const evaluationId = req.params.id;

    const deleteEvaluation = await evaluationServices.deleteEvaluation(
      evaluationId
    );

    if (!deleteEvaluation) {
      return res.status(404).send("Evaluation not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluationsByEleveId,
  updateEvaluation,
  deleteEvaluation,
};
