const compression = require("compression");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const AppRouter = require("./routes/appRouter");
const app = express();

const parentDao = require("./dao/parentDao/parentDao");

const server = http.createServer(app);

const corsOptions = {
  origin: "*",
};
app.use(compression());

app.use(cors(corsOptions));
app.use(express.static("files"));
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(process.env.MONGO_ATLAS_URL);

app.use("/api", AppRouter);

app.all("*", (req, res) => {
  res.status(404).send("404 - Not Found");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
