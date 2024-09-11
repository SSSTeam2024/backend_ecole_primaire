const etudiantService = require("../../services/etudiantServices/etudiantServices");
const globalFunctions = require("../../utils/globalFunctions");

const createEtudiant = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      date_de_naissance,
      classe,
      parent,
      genre,
      avatar_base64_string,
      avatar_extension,
      statusPaiement,
    } = req.body;

    const etudiantFilesPath = "files/etudiantFiles/";

    let avatar = globalFunctions.generateUniqueFilename(
      avatar_extension,
      "Avatar"
    );

    let documents = [
      {
        base64String: avatar_base64_string,
        extension: avatar_extension,
        name: avatar,
        path: etudiantFilesPath,
      },
    ];

    const newEtudiant = await etudiantService.createEtudiant(
      {
        nom,
        prenom,
        date_de_naissance,
        classe,
        parent,
        genre,
        avatar,
        statusPaiement,
      },
      documents
    );
    res.status(201).json(newEtudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEtudiant = async (req, res) => {
  try {
    const etudiantId = req.params.id;

    const deleteEtudiant = await etudiantService.deleteEtudiant(etudiantId);

    if (!deleteEtudiant) {
      return res.status(404).send("Etudiant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtudiants = async (req, res) => {
  try {
    const Etudiants = await etudiantService.getEtudiants();
    res.json(Etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateEtudiant = async (req, res) => {
  try {
    const etudiantId = req.params.id;
    const {
      nom,
      prenom,
      date_de_naissance,
      classe,
      parent,
      genre,
      avatar_base64_string,
      avatar_extension,
    } = req.body;

    const etudiantFilesPath = "files/etudiantFiles/";

    let avatar = globalFunctions.generateUniqueFilename(
      avatar_extension,
      "Avatar"
    );

    let etudiantBody = {
      nom,
      prenom,
      date_de_naissance,
      classe,
      parent,
      genre,
    };

    let documents = [];

    if (avatar_base64_string) {
      documents.push({
        base64String: avatar_base64_string,
        extension: avatar_extension,
        name: avatar,
        path: etudiantFilesPath,
      });
    }

    if (avatar_base64_string) {
      etudiantBody.avatar = avatar;
    }
    const etudiant = await etudiantService.updateEtudiant(
      etudiantId,
      etudiantBody,
      documents
    );

    res.status(200).json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEtudiantsByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const etudiants = await etudiantService.getEtudiantsByClasseId(classeId);

    if (!etudiants) {
      return res.status(404).send("This classe does not have any students!!");
    }

    res.json(etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateStatusPaiment = async (req, res) => {
  try {
    const { _id, statusPaiement } = req.body;
    const sentResult = await etudiantService.updateStatusPaiemnt({
      etudiant_id: _id,
      paiement: statusPaiement,
    });
    res.json({ success: sentResult });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createEtudiant,
  deleteEtudiant,
  getEtudiants,
  updateEtudiant,
  getEtudiantsByClasseId,
  updateStatusPaiment,
};
