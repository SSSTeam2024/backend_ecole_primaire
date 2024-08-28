const absenceService = require("../../services/absenceServices/absenceServices");

const createAbsence = async (req, res) => {
  try {
    const { eleve, matiere, enseignant, type, heure, date } = req.body;
    const newAbsence = await absenceService.createAbsence({
      eleve,
      matiere,
      enseignant,
      type,
      heure,
      date,
    });
    res.status(201).json(newAbsence);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAbsences = async (req, res) => {
  try {
    const absences = await absenceService.getAbsences();
    res.json(absences);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateAbsence = async (req, res) => {
  try {
    const absenceId = req.params.id;
    const { eleve, matiere, enseignant, type, heure, date } = req.body;

    const updateAbsence = await absenceService.updateAbsence(absenceId, {
      eleve,
      matiere,
      enseignant,
      type,
      heure,
      date,
    });

    if (!updateAbsence) {
      return res.status(404).send("Absence not found");
    }
    res.json(updateAbsence);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteAbsence = async (req, res) => {
  try {
    const absenceId = req.params.id;

    const deletedAbsence = await absenceService.deleteAbsence(absenceId);

    if (!deletedAbsence) {
      return res.status(404).send("Absence not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAbsencesByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const absences = await absenceService.getAbsencesByEleveId(eleveId);

    if (!absences) {
      return res.status(404).send("No Absence found");
    }

    res.json(absences);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createAbsence,
  getAbsences,
  updateAbsence,
  deleteAbsence,
  getAbsencesByEleveId,
};
