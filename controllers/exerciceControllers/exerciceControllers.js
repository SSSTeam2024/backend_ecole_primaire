const exerciceService = require("../../services/exerciceServices/exerciceServices");
const globalFunctions = require("../../utils/globalFunctions");

const createExercice = async (req, res) => {
  try {
    const {
      classes,
      matiere,
      desc,
      creation_date,
      badge_date,
      enseignant,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const exerciceFilesPath = "files/exerciceFiles/";
    let fichier = "";
    let documents = [];

    if (fichier_base64_string !== "") {
      fichier = globalFunctions.generateUniqueFilename(
        fichier_extension,
        "Exercice"
      );
      documents.push({
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: exerciceFilesPath,
      });
    }

    const newExercice = await exerciceService.createExercice(
      {
        classes,
        matiere,
        desc,
        creation_date,
        badge_date,
        enseignant,
        fichier,
      },
      documents
    );
    res.status(201).json(newExercice);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteExercice = async (req, res) => {
  try {
    const exerciceId = req.params.id;

    const deleteExercice = await exerciceService.deleteExercice(exerciceId);

    if (!deleteExercice) {
      return res.status(404).send("Exercice not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getExercices = async (req, res) => {
  try {
    const exercices = await exerciceService.getExercices();
    res.json(exercices);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getExercicesByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const exercices = await exerciceService.getExercicesByClasseId(classeId);
    res.json(exercices);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateExercice = async (req, res) => {
  try {
    const exerciceId = req.params.id;
    const {
      classes,
      matiere,
      desc,
      creation_date,
      badge_date,
      enseignant,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const exerciceFilesPath = "files/exerciceFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Exercice"
    );

    let exerciceBody = {
      classes,
      matiere,
      desc,
      creation_date,
      badge_date,
      enseignant,
      fichier_base64_string,
      fichier_extension,
    };

    let documents = [];

    if (fichier_base64_string) {
      documents.push({
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: exerciceFilesPath,
      });
    }

    if (fichier_base64_string) {
      exerciceBody.fichier = fichier;
    }
    const exercice = await exerciceService.updateExercice(
      exerciceId,
      exerciceBody,
      documents
    );

    res.status(200).json(exercice);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createExercice,
  deleteExercice,
  getExercices,
  getExercicesByClasseId,
  updateExercice,
};
