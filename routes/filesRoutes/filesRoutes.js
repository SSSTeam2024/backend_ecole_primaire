const express = require("express");
const fileControllers = require("../../controllers/fileControllers/fileControllers");

const router = express.Router();

router.get("/download", fileControllers.getFile);

module.exports = router;
