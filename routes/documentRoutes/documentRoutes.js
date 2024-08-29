const express = require("express");
const documentController = require("../../controllers/documentControllers/documentControllers");

const router = express.Router();

router.post("/newDocument", documentController.createDocument);
router.get("/getDocuments", documentController.getDocuments);
router.patch("/updateDocument/:id", documentController.updateDocument);
router.delete("/deleteDocument/:id", documentController.deleteDocument);
router.get(
  "/document-classe-id/:id",
  documentController.getDocumentsByClasseId
);

module.exports = router;
