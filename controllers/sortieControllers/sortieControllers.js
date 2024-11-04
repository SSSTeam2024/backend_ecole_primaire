const sortieSerivces = require("../../services/sortieSerivces/sortieSerivces");

const createSortie = async (req, res) => {
  try {
    const { date, heure, id_eleve, trimestre } = req.body;
    const newSortie = await sortieSerivces.createSortie({
      date,
      heure,
      id_eleve,
      trimestre,
    });
    res.status(201).json(newSortie);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSorties = async (req, res) => {
  try {
    const sorties = await sortieSerivces.getSorties();
    res.json(sorties);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateSortie = async (req, res) => {
  try {
    const sortieId = req.params.id;
    const { date, heure, id_eleve, trimestre } = req.body;

    const updateSortie = await sortieSerivces.updateSortie(sortieId, {
      date,
      heure,
      id_eleve,
      trimestre,
    });

    if (!updateSortie) {
      return res.status(404).send("Sortie not found");
    }
    res.json(updateSortie);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSortie = async (req, res) => {
  try {
    const sortieId = req.params.id;

    const deleteSortie = await sortieSerivces.deleteSortie(sortieId);

    if (!deleteSortie) {
      return res.status(404).send("Sortie not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSortiesByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const sorties = await sortieSerivces.getSortiesByEleveId(eleveId);
    res.json(sorties);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createSortie,
  getSorties,
  updateSortie,
  deleteSortie,
  getSortiesByEleveId,
};
