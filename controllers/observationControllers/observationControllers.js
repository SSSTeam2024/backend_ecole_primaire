const observationService = require("../../services/observationServices/observationServices");
const globalFunctions = require("../../utils/globalFunctions");

const createObservation = async (req, res) => {
  try {
    const {
      titre,
      date,
      description,
      classe,
      fichier_base64_string,
      fichier_extension,
      par,
    } = req.body;

    const observationFilesPath = "files/observationFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "fichierObservation"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: observationFilesPath,
      },
    ];

    const newObservation = await observationService.createObservation(
      {
        titre,
        date,
        description,
        classe,
        fichier,
        par,
      },
      documents
    );
    res.status(201).json(newObservation);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getObservations = async (req, res) => {
  try {
    const observations = await observationService.getObservations();
    res.json(observations);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createObservation,
  getObservations,
};
