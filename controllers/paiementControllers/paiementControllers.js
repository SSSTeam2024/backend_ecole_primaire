const paiementServices = require("../../services/paiementServices/paiementServices");

const createPaiement = async (req, res) => {
  try {
    const { eleve, annee_scolaire, montant, date_paiement } = req.body;
    const newPaiement = await paiementServices.createPaiement({
      eleve,
      annee_scolaire,
      montant,
      date_paiement,
    });
    res.status(201).json(newPaiement);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPaiements = async (req, res) => {
  try {
    const paiements = await paiementServices.getPaiements();
    res.json(paiements);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPaiementByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const paiements = await paiementServices.getPaiementByEleveId(eleveId);
    if (!paiements) {
      return res.status(404).send("No payment to this student");
    }
    res.json(paiements);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updatePaiement = async (req, res) => {
  try {
    const paiementId = req.params.id;
    const { eleve, annee_scolaire, montant, date_paiement } = req.body;

    const updatePaiement = await paiementServices.updatePaiement(paiementId, {
      eleve,
      annee_scolaire,
      montant,
      date_paiement,
    });

    if (!updatePaiement) {
      return res.status(404).send("Paiement not found");
    }
    res.json(updatePaiement);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePaiement = async (req, res) => {
  try {
    const paiementId = req.params.id;

    const deletePaiement = await paiementServices.deletePaiement(paiementId);

    if (!deletePaiement) {
      return res.status(404).send("Paiement not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createPaiement,
  getPaiements,
  updatePaiement,
  getPaiementByEleveId,
  deletePaiement,
};
