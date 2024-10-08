const matiereService = require("../../services/matiereServices/matiereServices");

const createMatiere = async (req, res) => {
  try {
    const { matieres, niveau } = req.body;
    const newMatiere = await matiereService.createMatiere({
      matieres,
      niveau,
    });
    res.status(201).json(newMatiere);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getMatieres = async (req, res) => {
  try {
    const matieres = await matiereService.getMatieres();
    res.json(matieres);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateMatiere = async (req, res) => {
  try {
    const matiereId = req.params.id;
    const { matieres, niveau } = req.body;

    const updatedMatiere = await matiereService.updateMatiere(matiereId, {
      matieres,
      niveau,
    });

    if (!updatedMatiere) {
      return res.status(404).send("Matiere not found");
    }
    res.json(updatedMatiere);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteMatiere = async (req, res) => {
  try {
    const matiereId = req.params.id;

    const deletedMatiere = await matiereService.deleteMatiere(matiereId);

    if (!deletedMatiere) {
      return res.status(404).send("Matiere not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getMatieresByClasseId = async (req, res) => {
  try {
    const { classeId } = req.params;
    const matieres = await matiereService.getMatieresByClasseId(classeId);
    res.json(matieres);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getMatieresByEtudiantId = async (req, res) => {
  try {
    const { etudiantId } = req.params;
    const matieres = await matiereService.getMatieresByEtudiantId(etudiantId);
    res.json(matieres);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createMatiere,
  getMatieres,
  updateMatiere,
  deleteMatiere,
  getMatieresByClasseId,
  getMatieresByEtudiantId,
};
