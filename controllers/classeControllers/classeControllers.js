const classeService = require("../../services/classeServices/classeServices");

const createClasse = async (req, res) => {
  try {
    const { nom_classe } = req.body;
    const newClasse = await classeService.createClasse({
      nom_classe,
    });
    res.status(201).json(newClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getClasses = async (req, res) => {
  try {
    const Classes = await classeService.getClasses();
    res.json(Classes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateClasse = async (req, res) => {
  try {
    const classeId = req.params.id;
    const { nom_classe } = req.body;

    const updatedClasse = await classeService.updateClasse(classeId, {
      nom_classe,
    });

    if (!updatedClasse) {
      return res.status(404).send("Classe not found");
    }
    res.json(updatedClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteClasse = async (req, res) => {
  try {
    const classeId = req.params.id;

    const deletedClasse = await classeService.deleteClasse(classeId);

    if (!deletedClasse) {
      return res.status(404).send("Classe not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createClasse,
  getClasses,
  deleteClasse,
  updateClasse,
};
