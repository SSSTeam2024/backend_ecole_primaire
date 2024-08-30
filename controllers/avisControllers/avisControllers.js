const avisService = require("../../services/avisServices/avisServices");
const globalFunctions = require("../../utils/globalFunctions");

const createAvis = async (req, res) => {
  try {
    const {
      classes,
      editeur,
      titre,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const AvisFilesPath = "files/AvisFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Avis"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: AvisFilesPath,
      },
    ];

    const newAvis = await avisService.createAvis(
      {
        classes,
        editeur,
        titre,
        desc,
        creation_date,
        fichier,
      },
      documents
    );
    res.status(201).json(newAvis);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAvis = async (req, res) => {
  try {
    const Avis = await avisService.getAvis();
    res.json(Avis);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteAvis = async (req, res) => {
  try {
    const avisId = req.params.id;

    const deleteAvis = await avisService.deleteAvis(avisId);

    if (!deleteAvis) {
      return res.status(404).send("Avis not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAvisByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const avis = await avisService.getAvisByClasseId(classeId);
    res.json(avis);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateAvis = async (req, res) => {
  try {
    const avisId = req.params.id;
    const {
      classes,
      editeur,
      titre,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const AvisFilesPath = "files/AvisFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Avis"
    );

    let avisBody = {
      classes,
      editeur,
      titre,
      desc,
      creation_date,
    };

    let documents = [];

    if (fichier_base64_string) {
      documents.push({
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: AvisFilesPath,
      });
    }

    if (fichier_base64_string) {
      avisBody.fichier = fichier;
    }
    const avis = await avisService.updateAvis(avisId, avisBody, documents);

    res.status(200).json(avis);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createAvis,
  deleteAvis,
  getAvis,
  getAvisByClasseId,
  updateAvis,
};
