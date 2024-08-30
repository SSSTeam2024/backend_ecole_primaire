const gallerieServices = require("../../services/gallerieServices/gallerieServices");
const globalFunctions = require("../../utils/globalFunctions");

const createGallerie = async (req, res) => {
  try {
    const {
      classes,
      titre,
      desc,
      creation_date,
      fichier_base64_string = [],
      fichier_extension = [],
    } = req.body;

    const gallerieFilesPath = "files/gallerieFiles/";

    const fichiers = fichier_extension.map((ext, index) =>
      globalFunctions.generateUniqueFilename(ext, `Gallerie${index}`)
    );

    let documents = [
      ...fichier_base64_string.map((base64String, index) => ({
        base64String: base64String,
        extension: fichier_extension[index],
        name: fichiers[index],
        path: gallerieFilesPath,
      })),
    ];

    const newGallerie = await gallerieServices.createGallerie(
      {
        classes,
        titre,
        desc,
        creation_date,
        fichiers,
      },
      documents
    );
    res.status(201).json(newGallerie);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getGalleries = async (req, res) => {
  try {
    const galleries = await gallerieServices.getGalleries();
    res.json(galleries);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteGallerie = async (req, res) => {
  try {
    const gallerieId = req.params.id;

    const deleteGallerie = await gallerieServices.deleteGallerie(gallerieId);

    if (!deleteGallerie) {
      return res.status(404).send("Gallerie not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getGalleriesByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const gallerie = await gallerieServices.getGalleriesByClasseId(classeId);
    res.json(gallerie);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateGallerie = async (req, res) => {
  try {
    const gallerieId = req.params.id;
    const {
      classes,
      titre,
      desc,
      creation_date,
      fichier_base64_string = [],
      fichier_extension = [],
    } = req.body;

    const gallerieFilesPath = "files/gallerieFiles/";

    const fichiers = fichier_extension.map((ext, index) =>
      globalFunctions.generateUniqueFilename(ext, `Gallerie${index}`)
    );

    let gallerieBody = {
      classes,
      titre,
      desc,
      creation_date,
    };

    let documents = [];

    if (
      Array.isArray(fichier_base64_string) &&
      fichier_base64_string.length > 0
    ) {
      fichier_base64_string.forEach((base64String, index) => {
        documents.push({
          base64String,
          extension: fichier_extension[index],
          name: fichiers[index],
          path: gallerieFilesPath,
        });
      });

      gallerieBody.fichiers = fichiers;
    }

    const gallerie = await gallerieServices.updateGallerie(
      gallerieId,
      gallerieBody,
      documents
    );

    res.status(200).json(gallerie);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createGallerie,
  getGalleries,
  deleteGallerie,
  getGalleriesByClasseId,
  updateGallerie,
};
