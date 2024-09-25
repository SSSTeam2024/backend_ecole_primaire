const path = require("path");
const getFile = async (req, res) => {
  const file = path.join(__dirname, "../../files", "sls.apk");

  // Send the file as an attachment
  res.download(file, (err) => {
    if (err) {
      console.log("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
};
module.exports = {
  getFile,
};
