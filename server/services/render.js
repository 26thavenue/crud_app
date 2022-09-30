const axios = require("axios");
const { response } = require("express");

exports.homeRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      console.log(response.data);
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addRoutes = (req, res) => {
  res.render("add-user");
};
exports.updateRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err.message);
    });
};
