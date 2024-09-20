const calendrierServices = require("../../services/calendrierServices/calendrierServices");

const createCalendrier = async (req, res) => {
  try {
    const {
      salle,
      trimestre,
      heure_debut,
      heure_fin,
      date,
      matiere,
      classe,
      enseignant,
      type,
    } = req.body;
    const newCalendrier = await calendrierServices.createCalendrier({
      salle,
      trimestre,
      heure_debut,
      heure_fin,
      date,
      matiere,
      classe,
      enseignant,
      type,
    });
    res.status(201).json(newCalendrier);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCalendriers = async (req, res) => {
  try {
    const calendriers = await calendrierServices.getCalendriers();
    res.json(calendriers);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getCalendriersByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const calendriers = await calendrierServices.getCalendriersByClasseId(
      classeId
    );
    if (!calendriers) {
      return res.status(404).send("Calendriers not found");
    }
    res.json(calendriers);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateCalendrier = async (req, res) => {
  try {
    const calendrierId = req.params.id;
    const {
      salle,
      trimestre,
      heure_debut,
      heure_fin,
      date,
      matiere,
      classe,
      enseignant,
    } = req.body;

    const updateCalendrier = await calendrierServices.updateCalendrier(
      calendrierId,
      {
        salle,
        trimestre,
        heure_debut,
        heure_fin,
        date,
        matiere,
        classe,
        enseignant,
      }
    );

    if (!updateCalendrier) {
      return res.status(404).send("Calendrier not found");
    }
    res.json(updateCalendrier);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteCalendrier = async (req, res) => {
  try {
    const calendrierId = req.params.id;

    const deleteCalendrier = await calendrierServices.deleteCalendrier(
      calendrierId
    );

    if (!deleteCalendrier) {
      return res.status(404).send("Calendrier not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createCalendrier,
  getCalendriers,
  updateCalendrier,
  deleteCalendrier,
  getCalendriersByClasseId,
};
