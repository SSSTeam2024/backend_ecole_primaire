const Rendezvous = require("../../models/rendezvousModel/rendezvousModel");

const createRendezvous = async (rendezvousData) => {
  return await Rendezvous.create(rendezvousData);
};

const getRendezvous = async () => {
  return await Rendezvous.find().populate("enseignants");
};

const updateRendezvous = async (id, updateData) => {
  return await Rendezvous.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteRendezvous = async (id) => {
  return await Rendezvous.findByIdAndDelete(id);
};

const getRendezvousByEnseignantId = async (enseignantId) => {
  const query = {
    enseignants: enseignantId,
  };
  return await Rendezvous.find(query).populate("enseignants");
};

module.exports = {
  createRendezvous,
  getRendezvous,
  updateRendezvous,
  deleteRendezvous,
  getRendezvousByEnseignantId,
};
