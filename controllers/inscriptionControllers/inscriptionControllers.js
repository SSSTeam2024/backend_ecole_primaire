const inscriptionService = require("../../services/inscriptionServices/inscriptionServices");
const globalFunctions = require("../../utils/globalFunctions");

const createInscription = async (req, res) => {
  try {
    const {
      classe,
      nom_eleve,
      prenom_eleve,
      date_naissance,
      lieu_naissance,
      sexe,
      adresse_eleve,
      situation_familiale,
      avec,
      responsable_legal,
      nom_parent,
      prenom_parent,
      adresse_parent,
      profession,
      nom_societe,
      phone,
      status,
      nationalite,
      annee_scolaire,
      etablissement_frequente,
      moyenne_trimestre_1,
      moyenne_trimestre_2,
      moyenne_trimestre_3,
      moyenne_annuelle,
      moyenne_concours_6,
      numero_convocation_concours,
      bulletin_base64,
      bulletin_extension,
      photo_base64,
      photo_extension,
      groupe,
      notes,
    } = req.body;

    const photoFilesPath = "files/inscriptionFiles/";

    let photoProfil = globalFunctions.generateUniqueFilename(
      photo_extension,
      "Photo"
    );

    const bulletinFilesPath = "files/inscriptionFiles/";

    let copie_bulletin = globalFunctions.generateUniqueFilename(
      bulletin_extension,
      "Bulletin"
    );

    let documents = [
      {
        base64String: photo_base64,
        extension: photo_extension,
        name: photoProfil,
        path: photoFilesPath,
      },
      {
        base64String: bulletin_base64,
        extension: bulletin_extension,
        name: copie_bulletin,
        path: bulletinFilesPath,
      },
    ];

    const newInscription = await inscriptionService.createInscription(
      {
        classe,
        nom_eleve,
        prenom_eleve,
        date_naissance,
        lieu_naissance,
        sexe,
        adresse_eleve,
        situation_familiale,
        avec,
        responsable_legal,
        nom_parent,
        prenom_parent,
        adresse_parent,
        profession,
        nom_societe,
        phone,
        status,
        nationalite,
        annee_scolaire,
        etablissement_frequente,
        moyenne_trimestre_1,
        moyenne_trimestre_2,
        moyenne_trimestre_3,
        moyenne_annuelle,
        moyenne_concours_6,
        numero_convocation_concours,
        copie_bulletin,
        photoProfil,
        groupe,
        notes,
      },
      documents
    );
    res.status(201).json(newInscription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getInscriptions = async (req, res) => {
  try {
    const inscriptions = await inscriptionService.getInscriptions();
    res.json(inscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateInscription = async (req, res) => {
  try {
    const inscriptionId = req.params.id;
    const { eleve, matiere, enseignant, type, heure, date } = req.body;

    const updateInscription = await inscriptionService.updateInscription(
      inscriptionId,
      {
        eleve,
        matiere,
        enseignant,
        type,
        heure,
        date,
      }
    );

    if (!updateInscription) {
      return res.status(404).send("Inscription not found");
    }
    res.json(updateInscription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteInscription = async (req, res) => {
  try {
    const inscriptionId = req.params.id;

    const deleteInscription = await inscriptionService.deleteInscription(
      inscriptionId
    );

    if (!deleteInscription) {
      return res.status(404).send("Inscription not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateInscriptionStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    console.log("controllers", req.body);
    const sentResult = await inscriptionService.updateInscriptionStatus({
      inscription_id: _id,
      statusInscri: status,
    });
    res.json({ success: sentResult });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateInscriptionGroupe = async (req, res) => {
  try {
    const { _id, groupe } = req.body;
    const sentResult = await inscriptionService.updateInscriptionGroupe({
      inscription_id: _id,
      groupeInscri: groupe,
    });
    res.json({ success: sentResult });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateInscriptionNotes = async (req, res) => {
  try {
    const { _id, notes } = req.body;
    const sentResult = await inscriptionService.updateInscriptionNotes({
      inscription_id: _id,
      notesInscri: notes,
    });
    res.json({ success: sentResult });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createInscription,
  getInscriptions,
  updateInscription,
  deleteInscription,
  updateInscriptionStatus,
  updateInscriptionGroupe,
  updateInscriptionNotes,
};
