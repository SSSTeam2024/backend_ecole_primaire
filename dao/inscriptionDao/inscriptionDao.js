const Inscription = require("../../models/inscriptionModel/inscriptionModel");

const createInscription = async (inscriptionData) => {
  console.log("dao", inscriptionData);
  return await Inscription.create(inscriptionData);
};

const getInscriptions = async () => {
  return await Inscription.find();
};

const updateInscription = async (id, updateData) => {
  return await Inscription.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteInscription = async (id) => {
  return await Inscription.findByIdAndDelete(id);
};

const updateInscriptionStatus = async (id, statusInscri) => {
  return await Inscription.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status: statusInscri,
      },
    }
  );
};

const updateInscriptionGroupe = async (id, groupeInscri) => {
  return await Inscription.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        groupe: groupeInscri,
      },
    }
  );
};

const updateInscriptionNotes = async (id, notesInscri) => {
  return await Inscription.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        notes: notesInscri,
      },
    }
  );
};

module.exports = {
  createInscription,
  getInscriptions,
  updateInscription,
  deleteInscription,
  updateInscriptionStatus,
  updateInscriptionGroupe,
  updateInscriptionNotes,
};
