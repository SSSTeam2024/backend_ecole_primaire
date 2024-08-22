const Observation = require("../../models/observationModel/observationModel");

const createObservation = async (observationData) => {
  return await Observation.create(observationData);
};

const getObservations = async () => {
  return await Observation.find().populate("classe");
};

const deleteObservation = async (id) => {
  return await Observation.findByIdAndDelete(id);
};

const getObservationsByClasseId = async (classeId) => {
  const query = {
    classe: classeId,
  };
  return await Observation.find(query).populate("classe");
};

module.exports = {
  createObservation,
  getObservations,
  deleteObservation,
  getObservationsByClasseId,
};
