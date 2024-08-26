const Paiement = require("../../models/paiementModel/paiementModel");

const createPaiement = async (paiementData) => {
  return await Paiement.create(paiementData);
};

const getPaiements = async () => {
  return await Paiement.find().populate("eleve");
};

const updatePaiement = async (id, updateData) => {
  return await Paiement.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePaiement = async (id) => {
  return await Paiement.findByIdAndDelete(id);
};

const getPaiementByEleveId = async (classeId) => {
  const query = {
    eleve: eleveId,
  };
  return await Paiement.find(query).populate("eleve");
};

module.exports = {
  createPaiement,
  getPaiements,
  updatePaiement,
  deletePaiement,
  getPaiementByEleveId,
};
