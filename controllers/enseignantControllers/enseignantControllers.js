const enseignantService = require("../../services/enseignantServices/enseignantServices");

const createEnseignant = async (req, res) => {
  try {
    const { nom_enseignant, prenom_enseignant } = req.body;
    const newEnseignant = await enseignantService.createEnseignant({
      nom_enseignant,
      prenom_enseignant,
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

module.exports = {
  createEnseignant,
  getEnseignants,
};
