const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/api/users");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRouter);

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");

  await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);

  next();
});

app.get('/favicon.ico', (req, res) => res.status(204));


app.use(async (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;