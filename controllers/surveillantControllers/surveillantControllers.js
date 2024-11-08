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

const login = async (req, res) => {
  try {
    const { nom_utilisateur, mot_de_passe } = req.body;
    const result = await surveillantServices.login(
      nom_utilisateur,
      mot_de_passe
    );
    console.log(result);
    res.json({ surveillant: result });
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
};

const logout = async (req, res) => {
  let id = req.params.id;

  await surveillantServices.logout(id);

  res.sendStatus(200);
};

const getSurveillantByJwtToken = async (req, res) => {
  try {
    const token = req.body.token;

    const getSurveillant = await surveillantServices.getSurveillantByToken(
      token
    );

    if (!getSurveillant) {
      return res.status(404).send("Surveillant not found");
    }
    res.json({ surveillant: getSurveillant });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSurveillantById = async (req, res) => {
  try {
    const surveillantId = req.params.id;

    const getSurveillant = await centralApp.getCentralAppById(
      surveillantServices
    );

    if (!getSurveillant) {
      return res.status(404).send("Surveillant not found");
    }
    res.json(getSurveillant);
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
  getSurveillantById,
  getSurveillantByJwtToken,
  logout,
  login,
};
