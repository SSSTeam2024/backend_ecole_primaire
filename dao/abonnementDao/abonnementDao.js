const Abonnement = require("../../models/abonnementModel/abonnementModel");

const createAbonnement = async (abonnementData) => {
  return await Abonnement.create(abonnementData);
};

const getAbonnements = async () => {
  return await Abonnement.find().populate("cantine").populate("eleve");
};

const updateAbonnement = async (id, updateData) => {
  return await Abonnement.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAbonnement = async (id) => {
  return await Abonnement.findByIdAndDelete(id);
};

const getAbonnementsByEleveId = async (eleveId) => {
  const query = {
    eleve: eleveId,
  };
  return await Abonnement.find(query).populate("cantine").populate("eleve");
};

module.exports = {
  createAbonnement,
  getAbonnements,
  updateAbonnement,
  deleteAbonnement,
  getAbonnementsByEleveId,
};
