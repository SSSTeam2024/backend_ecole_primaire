const cantineServices = require("../../services/cantineServices/cantineServices");
const globalFunctions = require("../../utils/globalFunctions");

const createCantine = async (req, res) => {
  try {
    const {
      jour,
      repas,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const cantineFilesPath = "files/cantineFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Cantine"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: cantineFilesPath,
      },
    ];

    const newCantine = await cantineServices.createCantine(
      {
        jour,
        repas,
        desc,
        creation_date,
        fichier,
      },
      documents
    );
    res.status(201).json(newCantine);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCantines = async (req, res) => {
  try {
    const cantines = await cantineServices.getCantines();
    res.json(cantines);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCantine = async (req, res) => {
  try {
    const cantineId = req.params.id;

    const deleteCantine = await cantineServices.deleteCantine(cantineId);

    if (!deleteCantine) {
      return res.status(404).send("Cantine not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateCantine = async (req, res) => {
  try {
    const cantineId = req.params.id;
    const {
      jour,
      repas,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const cantineFilesPath = "files/cantineFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Cantine"
    );

    let cantineBody = {
      jour,
      repas,
      desc,
      creation_date,
    };

    let documents = [];

    if (fichier_base64_string) {
      documents.push({
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: cantineFilesPath,
      });
    }

    if (fichier_base64_string) {
      cantineBody.fichier = fichier;
    }
    const cantine = await cantineServices.updateCantine(
      cantineId,
      cantineBody,
      documents
    );

    res.status(200).json(cantine);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createCantine,
  deleteCantine,
  getCantines,
  updateCantine,
};
