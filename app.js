const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/api/users");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRouter);

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