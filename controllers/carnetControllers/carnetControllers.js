const carnetService = require("../../services/carnetServices/carnetServices");
const globalFunctions = require("../../utils/globalFunctions");

const createCarnet = async (req, res) => {
  try {
    const { classe, trimestre, date, eleves } = req.body;
    const carnetFilesPath = "files/carnetFiles/";
    let documents = [];
    const elevesWithFiles = eleves.map((eleveData) => {
      const { eleve, note, fichier_base64_string, fichier_extension } =
        eleveData;
      let fichier = globalFunctions.generateUniqueFilename(
        fichier_extension,
        "Bulletin"
      );
      documents.push({
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: carnetFilesPath,
      });
      return {
        eleve,
        note,
        fichier,
      };
    });
    const newCarnet = await carnetService.createCarnet(
      {
        classe,
        trimestre,
        date,
        eleves: elevesWithFiles,
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

const updateCarnet = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateData, eleves } = req.body;
    const carnetFilesPath = "files/carnetFiles/";
    let documents = [];

    const elevesWithFiles = eleves.map((eleveData) => {
      const { eleve, note, fichier_base64_string, fichier_extension } =
        eleveData;
      let fichier = globalFunctions.generateUniqueFilename(
        fichier_extension,
        "Bulletin"
      );
      documents.push({
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: carnetFilesPath,
      });
      return {
        eleve,
        note,
        fichier,
      };
    });

    const updatedCarnet = await carnetService.updateCarnet(
      id,
      updateData,
      documents
    );

    if (!updatedCarnet) {
      return res.status(404).json({ message: "Carnet not found" });
    }

    res.status(200).json(updatedCarnet);
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
  updateCarnet,
};
