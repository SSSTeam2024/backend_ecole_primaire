const emploiService = require("../../services/emploiServices/emploiServices");
const globalFunctions = require("../../utils/globalFunctions");

const createEmploi = async (req, res) => {
  try {
    const { titre, classe, date, image_base64_string, image_extension } =
      req.body;

    const emploiFilesPath = "files/emploiFiles/";

    let image = globalFunctions.generateUniqueFilename(
      image_extension,
      "Emploi"
    );

    let documents = [
      {
        base64String: image_base64_string,
        extension: image_extension,
        name: image,
        path: emploiFilesPath,
      },
    ];

    const newEmploi = await emploiService.createEmploi(
      {
        titre,
        classe,
        date,
        image,
      },
      documents
    );
    res.status(201).json(newEmploi);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEmploi = async (req, res) => {
  try {
    const emploiId = req.params.id;

    const deleteEmploi = await emploiService.deleteEmploi(emploiId);

    if (!deleteEmploi) {
      return res.status(404).send("Emploi not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEmplois = async (req, res) => {
  try {
    const emplois = await emploiService.getEmplois();
    res.json(emplois);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEmploisByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const emplois = await emploiService.getEmploisByClasseId(classeId);
    res.json(emplois);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateEmploi = async (req, res) => {
  try {
    const emploiId = req.params.id;
    const { titre, classe, date, image_base64_string, image_extension } =
      req.body;

    const emploiFilesPath = "files/emploiFiles/";

    let image = globalFunctions.generateUniqueFilename(
      image_extension,
      "Emploi"
    );

    let emploiBody = {
      titre,
      classe,
      date,
    };

    let documents = [];

    if (image_base64_string) {
      documents.push({
        base64String: image_base64_string,
        extension: image_extension,
        name: image,
        path: emploiFilesPath,
      });
    }

    if (image_base64_string) {
      emploiBody.image = image;
    }
    const emploi = await emploiService.updateEmploi(
      emploiId,
      emploiBody,
      documents
    );

    res.status(200).json(emploi);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createEmploi,
  deleteEmploi,
  getEmplois,
  getEmploisByClasseId,
  updateEmploi,
};
