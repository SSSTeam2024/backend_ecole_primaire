const express = require("express");
const rendezvousControllers = require("../../controllers/rendezvousControllers/rendezvousControllers");

const router = express.Router();

router.post("/createRendezvous", rendezvousControllers.createRendezvous);
router.get("/getRendezvous", rendezvousControllers.getRendezvous);
router.patch("/updateRendezvous/:id", rendezvousControllers.updateRendezvous);
router.delete("/deleteRendezvous/:id", rendezvousControllers.deleteRendezvous);
router.get(
  "/rendezvous-enseignant-id/:id",
  rendezvousControllers.getRendezvousByEnseignantId
);

module.exports = router;
