"use strict";

const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const app = express();
const cors = require("cors");

const routes = require("./routes/index");

app
  .set("views", path.join(__dirname, "views"))
  .engine("html", require("ejs").renderFile)
  .set("port", process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, "assets")));

// routes
app.use(routes);

app.use(async (req, res, next) => {
  console.log(`${req.url} - ${req.method}`);
  next();
});

app.use((req, res, next) => {
  return res.status(400).json({ message: "No existe esta operacion" });
});

app.listen(app.get("port"), () => {
  console.log(`Listening at http://localhost:${app.get("port")}`);
});
