const express = require("express");
const documentController = require("../../controllers/documentControllers/documentControllers");

const router = express.Router();

router.post("/newDocument", documentController.createDocument);
router.get("/getDocuments", documentController.getDocuments);
// router.patch("/updateMatiere/:id", documentController.updateMatiere);
router.delete("/deleteDocument/:id", documentController.deleteDocument);

module.exports = router;
