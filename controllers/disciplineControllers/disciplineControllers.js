const disciplineService = require("../../services/disciplineServices/disciplineServices");
const globalFunctions = require("../../utils/globalFunctions");

const createDiscipline = async (req, res) => {
  try {
    const {
      classe,
      eleve,
      type,
      texte,
      editeur,
      date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const disciplineFilesPath = "files/disciplineFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Discipline"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: disciplineFilesPath,
      },
    ];

    const newDiscipline = await disciplineService.createDiscipline(
      {
        classe,
        eleve,
        type,
        texte,
        editeur,
        date,
        fichier,
      },
      documents
    );
    res.status(201).json(newDiscipline);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteDiscipline = async (req, res) => {
  try {
    const disciplineId = req.params.id;

    const deleteDiscipline = await disciplineService.deleteDiscipline(
      disciplineId
    );

    if (!deleteDiscipline) {
      return res.status(404).send("Discipline not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDisciplines = async (req, res) => {
  try {
    const disciplines = await disciplineService.getDisciplines();
    res.json(disciplines);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDisciplinesByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const disciplines = await disciplineService.getDisciplineByEleveId(eleveId);
    res.json(disciplines);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateDiscipline = async (req, res) => {
  try {
    const disciplineId = req.params.id;
    const {
      classe,
      eleve,
      type,
      texte,
      editeur,
      date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const disciplineFilesPath = "files/disciplineFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Discipline"
    );

    let disciplineBody = {
      classe,
      eleve,
      type,
      texte,
      editeur,
      date,
    };

    let documents = [];

    if (fichier_base64_string) {
      documents.push({
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: disciplineFilesPath,
      });
    }

    if (fichier_base64_string) {
      disciplineBody.fichier = fichier;
    }
    const discipline = await disciplineService.updateDiscipline(
      disciplineId,
      disciplineBody,
      documents
    );

    res.status(200).json(discipline);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createDiscipline,
  deleteDiscipline,
  getDisciplines,
  getDisciplinesByEleveId,
  updateDiscipline,
};
