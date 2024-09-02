const inscriptionService = require("../../services/inscriptionServices/inscriptionServices");

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
    } = req.body;
    const newInscription = await inscriptionService.createInscription({
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
    });
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
      inscription_id: _id, // Map _id to inscription_id
      statusInscri: status,
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
};
