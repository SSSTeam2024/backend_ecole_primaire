const express = require("express");
const gallerieControllers = require("../../controllers/gallerieControllers/gallerieControllers");

const router = express.Router();

router.post("/newGallerie", gallerieControllers.createGallerie);
router.get("/getGallerie", gallerieControllers.getGalleries);
// router.patch("/updateGallerie/:id", gallerieControllers.updateMatiere);
router.delete("/deleteGallerie/:id", gallerieControllers.deleteGallerie);
router.get(
  "/gallerie-classe-id/:id",
  gallerieControllers.getGalleriesByClasseId
);

module.exports = router;
