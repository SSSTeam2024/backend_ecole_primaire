const Calendrier = require("../../models/calendrierModel/calendrierModel");

const createCalendrier = async (calendrierData) => {
  console.log(calendrierData);
  return await Calendrier.create(calendrierData);
};

const getCalendriers = async () => {
  return await Calendrier.find()
    .populate("classe")
    .populate("enseignant")
    .populate("salle");
};

const updateCalendrier = async (id, updateData) => {
  return await Calendrier.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCalendrier = async (id) => {
  return await Calendrier.findByIdAndDelete(id);
};

const getCalendriersByClasseId = async (classeId) => {
  const query = {
    classe: classeId,
  };
  return await Calendrier.find(query)
    .populate("classe")
    .populate("matiere")
    .populate("enseignant")
    .populate("salle");
};

module.exports = {
  createCalendrier,
  getCalendriers,
  updateCalendrier,
  deleteCalendrier,
  getCalendriersByClasseId,
};
