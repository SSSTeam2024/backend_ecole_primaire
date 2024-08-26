const Gallerie = require("../../models/gallerieModel/gallerieModel");

const createGallerie = async (gallerieData) => {
  return await Gallerie.create(gallerieData);
};

const getGalleries = async () => {
  return await Gallerie.find().populate("classes");
};

const updateGallerie = async (id, updateData) => {
  return await Gallerie.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteGallerie = async (id) => {
  return await Gallerie.findByIdAndDelete(id);
};

const getGalleriesByClasseId = async (classeId) => {
  const query = {
    classes: classeId,
  };
  return await Gallerie.find(query).populate("classes");
};

module.exports = {
  createGallerie,
  getGalleries,
  updateGallerie,
  deleteGallerie,
  getGalleriesByClasseId,
};
