var Userdb = require("../model/model");

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(404).send({ message: "Content cannot be empty" });
    return;
  }
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  user
    .save(user)
    .then((data) => {
      //   res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating user schema",
      });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving user" });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || " Error occured while fetching your data",
        });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data cannot be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Cannot update user with " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: " Error update user information" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Cannot delete with id" + id });
      } else {
        res.send({ message: "Schema was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting user with id" + id });
    });
};
