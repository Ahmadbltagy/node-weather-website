const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./forecast");
const geography = require("./geocode");

const app = express();
//!get port depends on OS
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup  hbs engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "BelTaGY" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "BelTaGY",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "BelTaGY",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address term",
    });
  }
  console.log(req.query);
  geography(req.query.address)
    .then((data) =>
      res.send({
        forecast: data.current.temperature,
        location: data.location.region + ", " + data.location.country,
        address: req.query.address,
      })
    )
    .catch((err) => res.send({ error: "You must enter a vaild country name" }));
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    errorMsg: "Help article not found",
    name: "BelTaGY",
  });
});

app.use("/users", (req, res, next) => {
  console.log("users");
  next.apply();
});

app.get("/users/getUsers", (req, res, next) => {
  console.log("getUsers");
  res.send({ users: [{ name: "mina" }, { name: "farid" }] });
});

app.get("/users/addUser", (req, res, next) => {
  console.log("addUsers");
  res.send({ users: [{ name: "Ahmad" }, { name: "El Beltagy" }] });
});

app.get("*", (req, res) => {
  res.status(404).render("404", {
    title: "404",
    errorMsg: "Page not founded",
    name: "BelTaGY",
  });
});
app.listen(port, () => console.log(`Server is up on port ${port}`));
