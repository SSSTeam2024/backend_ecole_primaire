const Rendezvous = require("../../models/rendezvousModel/rendezvousModel");

const createRendezvous = async (rendezvousData) => {
  const newRendezvous = await Rendezvous.create(rendezvousData);
  return await Rendezvous.findById(newRendezvous._id)
    .populate("parents")
    .populate("matiere");
};

const getRendezvous = async () => {
  return await Rendezvous.find().populate("parents").populate("matiere");
};

const updateRendezvous = async (id, updateData) => {
  return await Rendezvous.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteRendezvous = async (id) => {
  return await Rendezvous.findByIdAndDelete(id);
};

const getRendezvousByParentId = async (parentId) => {
  const query = {
    parents: parentId,
  };
  return await Rendezvous.find(query).populate("parents").populate("matiere");
};

module.exports = {
  createRendezvous,
  getRendezvous,
  updateRendezvous,
  deleteRendezvous,
  getRendezvousByParentId,
};
