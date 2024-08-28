const salleServices = require("../../services/salleServices/salleServices");

const createSalle = async (req, res) => {
  try {
    const { nom_salle } = req.body;
    const newSalle = await salleServices.createSalle({
      nom_salle,
    });
    res.status(201).json(newSalle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSalles = async (req, res) => {
  try {
    const salles = await salleServices.getSalles();
    res.json(salles);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateSalle = async (req, res) => {
  try {
    const salleId = req.params.id;
    const { nom_salle } = req.body;

    const updateSalle = await salleServices.updateSalle(salleId, {
      nom_salle,
    });

    if (!updateSalle) {
      return res.status(404).send("Salle not found");
    }
    res.json(updateSalle);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSalle = async (req, res) => {
  try {
    const salleId = req.params.id;

    const deleteSalle = await salleServices.deleteSalle(salleId);

    if (!deleteSalle) {
      return res.status(404).send("Salle not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createSalle,
  getSalles,
  updateSalle,
  deleteSalle,
};
