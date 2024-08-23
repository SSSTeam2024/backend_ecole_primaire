const carnetService = require("../../services/carnetServices/carnetServices");
const globalFunctions = require("../../utils/globalFunctions");

const createCarnet = async (req, res) => {
  try {
    const {
      eleve,
      trimestre,
      note,
      date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const carnetFilesPath = "files/carnetFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Carnet"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: carnetFilesPath,
      },
    ];

    const newCarnet = await carnetService.createCarnet(
      {
        eleve,
        trimestre,
        note,
        date,
        fichier,
      },
      documents
    );
    res.status(201).json(newCarnet);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCarnets = async (req, res) => {
  try {
    const carnets = await carnetService.getCarnets();
    res.json(carnets);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCarnetsByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const carnets = await carnetService.getCarnetsByEleveId(eleveId);
    res.json(carnets);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCarnet = async (req, res) => {
  try {
    const carnetId = req.params.id;

    const deleteCarnet = await carnetService.deleteCarnet(carnetId);

    if (!deleteCarnet) {
      return res.status(404).send("Carnet not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createCarnet,
  getCarnets,
  getCarnetsByEleveId,
  deleteCarnet,
};
