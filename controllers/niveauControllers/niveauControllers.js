const niveauServices = require("../../services/niveauServices/niveauServices");

const createNiveau = async (req, res) => {
  try {
    const { nom_niveau, type } = req.body;
    const newNiveau = await niveauServices.createNiveau({
      nom_niveau,
      type,
    });
    res.status(201).json(newNiveau);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNiveaux = async (req, res) => {
  try {
    const niveaux = await niveauServices.getNiveaux();
    res.json(niveaux);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateNiveau = async (req, res) => {
  try {
    const niveauId = req.params.id;
    const { nom_niveau, type } = req.body;

    const updateNiveau = await niveauServices.updateNiveau(niveauId, {
      nom_niveau,
      type,
    });

    if (!updateNiveau) {
      return res.status(404).send("Niveau not found");
    }
    res.json(updateNiveau);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteNiveau = async (req, res) => {
  try {
    const niveauId = req.params.id;

    const deleteNiveau = await niveauServices.deleteNiveau(niveauId);

    if (!deleteNiveau) {
      return res.status(404).send("Niveau not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createNiveau,
  getNiveaux,
  updateNiveau,
  deleteNiveau,
};
