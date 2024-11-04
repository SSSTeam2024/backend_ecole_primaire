const retardSerivces = require("../../services/retardSerivces/retardSerivces");

const createRetard = async (req, res) => {
  try {
    const { date, heure, id_eleve, trimestre } = req.body;
    const newRetard = await retardSerivces.createRetard({
      date,
      heure,
      id_eleve,
      trimestre,
    });
    res.status(201).json(newRetard);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getRetards = async (req, res) => {
  try {
    const retards = await retardSerivces.getRetards();
    res.json(retards);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateRetard = async (req, res) => {
  try {
    const retardId = req.params.id;
    const { date, heure, id_eleve, trimestre } = req.body;

    const updateRetard = await retardSerivces.updateRetard(retardId, {
      date,
      heure,
      id_eleve,
      trimestre,
    });

    if (!updateRetard) {
      return res.status(404).send("Retard not found");
    }
    res.json(updateRetard);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteRetard = async (req, res) => {
  try {
    const retardId = req.params.id;

    const deleteRetard = await retardSerivces.deleteRetard(retardId);

    if (!deleteRetard) {
      return res.status(404).send("Retard not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getRetardByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const retards = await retardSerivces.getRetardByEleveId(eleveId);
    res.json(retards);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createRetard,
  getRetards,
  updateRetard,
  deleteRetard,
  getRetardByEleveId,
};
