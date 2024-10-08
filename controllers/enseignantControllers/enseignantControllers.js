const enseignantService = require("../../services/enseignantServices/enseignantServices");

const createEnseignant = async (req, res) => {
  try {
    const { nom_enseignant, prenom_enseignant, phone, matiere } = req.body;
    const newEnseignant = await enseignantService.createEnseignant({
      nom_enseignant,
      prenom_enseignant,
      phone,
      matiere,
    });
    res.status(201).json(newEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEnseignants = async (req, res) => {
  try {
    const Enseignants = await enseignantService.getEnseignants();
    res.json(Enseignants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEnseignant = async (req, res) => {
  try {
    const enseignantId = req.params.id;

    const deletedEnseignant = await enseignantService.deleteEnseignant(
      enseignantId
    );

    if (!deletedEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateEnseignant = async (req, res) => {
  try {
    const enseignantId = req.params.id;
    const { nom_enseignant, prenom_enseignant, phone, matiere } = req.body;

    const updateEnseignant = await enseignantService.updateEnseignant(
      enseignantId,
      {
        nom_enseignant,
        prenom_enseignant,
        phone,
        matiere,
      }
    );

    if (!updateEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.json(updateEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getEnseignantById = async (req, res) => {
  try {
    const enseignantId = req.params.id;

    const getEnseignant = await enseignantService.getEnseignantById(
      enseignantId
    );

    if (!getEnseignant) {
      return res.status(404).send("Enseignant not found");
    }
    res.json(getEnseignant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createEnseignant,
  getEnseignants,
  deleteEnseignant,
  updateEnseignant,
  getEnseignantById,
};
