const Messagerie = require("../../models/messagerieModel/messagerieModel");

const createMessagerie = async (messagerieData) => {
  return await Messagerie.create(messagerieData);
};

const getMessageries = async () => {
  return await Messagerie.find();
};

const updateMessagerie = async (id, updateData) => {
  return await Messagerie.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMessagerie = async (id) => {
  return await Messagerie.findByIdAndDelete(id);
};

module.exports = {
  createMessagerie,
  getMessageries,
  updateMessagerie,
  deleteMessagerie,
};
