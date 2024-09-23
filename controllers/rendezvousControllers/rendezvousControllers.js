const rendezvousServices = require("../../services/rendezvousServices/rendezvousServices");

const createRendezvous = async (req, res) => {
  try {
    const {
      titre,
      date,
      description,
      parents,
      heure,
      matiere,
      administration,
      createdBy,
    } = req.body;
    const newRendezvous = await rendezvousServices.createRendezvous({
      titre,
      date,
      description,
      parents,
      heure,
      matiere,
      administration,
      createdBy,
    });
    res.status(201).json(newRendezvous);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getRendezvous = async (req, res) => {
  try {
    const rendezvous = await rendezvousServices.getRendezvous();
    res.json(rendezvous);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getRendezvousByParentId = async (req, res) => {
  try {
    const { id: parentId } = req.params;
    const rendezvous = await rendezvousServices.getRendezvousByParentId(
      parentId
    );

    if (!rendezvous) {
      return res.status(404).send("No Rendez-vous found");
    }

    res.json(rendezvous);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateRendezvous = async (req, res) => {
  try {
    const rendezvousId = req.params.id;
    const {
      titre,
      date,
      description,
      parents,
      heure,
      matiere,
      administration,
      createdBy,
    } = req.body;

    const updateRendezvous = await rendezvousServices.updateRendezvous(
      rendezvousId,
      {
        titre,
        date,
        description,
        parents,
        heure,
        matiere,
        administration,
        createdBy,
      }
    );

    if (!updateRendezvous) {
      return res.status(404).send("Rendez-vous not found");
    }
    res.json(updateRendezvous);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteRendezvous = async (req, res) => {
  try {
    const rendezvousId = req.params.id;

    const deleteRendezvous = await rendezvousServices.deleteRendezvous(
      rendezvousId
    );

    if (!deleteRendezvous) {
      return res.status(404).send("Rendez-vous not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createRendezvous,
  getRendezvous,
  getRendezvousByParentId,
  updateRendezvous,
  deleteRendezvous,
};
