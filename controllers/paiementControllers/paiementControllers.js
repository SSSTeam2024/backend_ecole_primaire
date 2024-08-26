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
    res.json(paiements);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const updateMatiere = async (req, res) => {
//   try {
//     const matiereId = req.params.id;
//     const { nom_matiere } = req.body;

//     const updatedMatiere = await paiementServices.updateMatiere(matiereId, {
//       nom_matiere,
//     });

//     if (!updatedMatiere) {
//       return res.status(404).send("Matiere not found");
//     }
//     res.json(updatedMatiere);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

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
  //   updateMatiere,
  getPaiementByEleveId,
  deletePaiement,
};
