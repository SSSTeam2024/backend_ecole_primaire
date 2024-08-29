const documentService = require("../../services/documentServices/documentServices");
const globalFunctions = require("../../utils/globalFunctions");

const createDocument = async (req, res) => {
  try {
    const {
      classes,
      titre,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const documentFilesPath = "files/documentFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Document"
    );

    let documents = [
      {
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: documentFilesPath,
      },
    ];

    const newDocument = await documentService.createDocument(
      {
        classes,
        titre,
        desc,
        creation_date,
        fichier,
      },
      documents
    );
    res.status(201).json(newDocument);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await documentService.getDocuments();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteDocument = async (req, res) => {
  try {
    const documentId = req.params.id;

    const deleteDocument = await documentService.deleteDocument(documentId);

    if (!deleteDocument) {
      return res.status(404).send("Document not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getDocumentsByClasseId = async (req, res) => {
  try {
    const { id: classeId } = req.params;
    const documents = await documentService.getDocumentsByClasseId(classeId);
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateDocument = async (req, res) => {
  try {
    const documentIdId = req.params.id;
    const {
      classes,
      titre,
      desc,
      creation_date,
      fichier_base64_string,
      fichier_extension,
    } = req.body;

    const documentFilesPath = "files/documentFiles/";

    let fichier = globalFunctions.generateUniqueFilename(
      fichier_extension,
      "Document"
    );

    let documentBody = {
      classes,
      titre,
      desc,
      creation_date,
    };

    let documents = [];

    if (fichier_base64_string) {
      documents.push({
        base64String: fichier_base64_string,
        extension: fichier_extension,
        name: fichier,
        path: documentFilesPath,
      });
    }

    if (fichier_base64_string) {
      documentBody.fichier = fichier;
    }
    const document = await documentService.updateDocument(
      documentIdId,
      documentBody,
      documents
    );

    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createDocument,
  deleteDocument,
  getDocuments,
  getDocumentsByClasseId,
  updateDocument,
};
