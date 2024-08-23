const Document = require("../../models/documentsModel/documentsModel");

const createDocument = async (documentData) => {
  return await Document.create(documentData);
};

const getDocuments = async () => {
  return await Document.find().populate("classes");
};

const updateDocument = async (id, updateData) => {
  return await Document.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDocument = async (id) => {
  return await Document.findByIdAndDelete(id);
};

module.exports = {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
};
