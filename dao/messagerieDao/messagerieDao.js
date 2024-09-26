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

const getMessageriesByParentId = async (id) => {
  const query = {
    $or: [{ sender: id }, { receiver: id }],
  };
  return await Messagerie.find(query);
};

module.exports = {
  createMessagerie,
  getMessageries,
  updateMessagerie,
  deleteMessagerie,
  getMessageriesByParentId,
};
