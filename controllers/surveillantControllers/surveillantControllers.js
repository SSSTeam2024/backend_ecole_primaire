const surveillantServices = require("../../services/surveillantServices/surveillantServices");

const createSurveillant = async (req, res) => {
  try {
    const {
      nom_surveillant,
      prenom_surveillant,
      nom_utilisateur,
      mot_de_passe,
      tel,
    } = req.body;
    const newSurveillant = await surveillantServices.createSurveillant({
      nom_surveillant,
      prenom_surveillant,
      nom_utilisateur,
      mot_de_passe,
      tel,
    });
    res.status(201).json(newSurveillant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSurveillants = async (req, res) => {
  try {
    const surveillants = await surveillantServices.getSurveillants();
    res.json(surveillants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateSurveillant = async (req, res) => {
  try {
    const surveillantId = req.params.id;
    const {
      nom_surveillant,
      prenom_surveillant,
      nom_utilisateur,
      mot_de_passe,
      tel,
    } = req.body;

    const updateSurveillant = await surveillantServices.updateSurveillant(
      surveillantId,
      {
        nom_surveillant,
        prenom_surveillant,
        nom_utilisateur,
        mot_de_passe,
        tel,
      }
    );

    if (!updateSurveillant) {
      return res.status(404).send("Surveillant not found");
    }
    res.json(updateSurveillant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteSurveillant = async (req, res) => {
  try {
    const surveillantId = req.params.id;

    const deleteSurveillant = await surveillantServices.deleteSurveillant(
      surveillantId
    );

    if (!deleteSurveillant) {
      return res.status(404).send("Surveillant not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createSurveillant,
  getSurveillants,
  updateSurveillant,
  deleteSurveillant,
};
