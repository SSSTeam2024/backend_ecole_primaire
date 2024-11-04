const Sortie = require("../../models/sortieModel/sortieModel");

const createSortie = async (sortieData) => {
  return await Sortie.create(sortieData);
};

const getSorties = async () => {
  return await Sortie.find().populate("id_eleve");
};

const updateSortie = async (id, updateData) => {
  return await Sortie.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSortie = async (id) => {
  return await Sortie.findByIdAndDelete(id);
};

const getSortiesByEleveId = async (eleveId) => {
  const query = {
    id_eleve: eleveId,
  };
  return await Sortie.find(query).populate("id_eleve");
};

module.exports = {
  createSortie,
  getSorties,
  updateSortie,
  deleteSortie,
  getSortiesByEleveId,
};
