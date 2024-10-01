const abonnementServices = require("../../services/abonnementServices/abonnementServices");

const createAbonnement = async (req, res) => {
  try {
    const { cantine, eleve, type, status } = req.body;
    const newAbonnement = await abonnementServices.createAbonnement({
      cantine,
      eleve,
      type,
      status,
    });
    res.status(201).json(newAbonnement);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAbonnements = async (req, res) => {
  try {
    const abonnements = await abonnementServices.getAbonnements();
    res.json(abonnements);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateAbonnement = async (req, res) => {
  try {
    const abonnementId = req.params.id;
    const { cantine, eleve, type, status } = req.body;

    const updateAbonnement = await abonnementServices.updateAbonnement(
      abonnementId,
      {
        cantine,
        eleve,
        type,
        status,
      }
    );

    if (!updateAbonnement) {
      return res.status(404).send("Abonnement not found");
    }
    res.json(updateAbonnement);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteAbonnement = async (req, res) => {
  try {
    const abonnementId = req.params.id;

    const deleteAbonnement = await abonnementServices.deleteAbonnement(
      abonnementId
    );

    if (!deleteAbonnement) {
      return res.status(404).send("Abonnement not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAbonnementsByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const abonnements = await abonnementServices.getAbonnementByEleveId(
      eleveId
    );
    res.json(abonnements);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createAbonnement,
  getAbonnements,
  updateAbonnement,
  deleteAbonnement,
  getAbonnementsByEleveId,
};
