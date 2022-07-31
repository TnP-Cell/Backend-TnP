const express = require("express");
const admin = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtverify = require("../middleware/jwtVerfication");
const adminModel = require("../models/adminModel");

admin.post("/adminLogin", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  adminModel.findOne({ username: username }, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    if (result) {
      bcrypt.compare(password, result.password, (err, result) => {
        if (err) res.status(400).json({ status: -1 });
        if (result) {
          var data = { id: result._id };
          var auth_token = jwt.sign(data, process.env.JWT_TOKEN);
          res.status(200).json({ status: 0, auth_token });
        } else res.status(400).json({ status: -1 });
      });
    } else res.status(400).json({ status: -1 });
  });
});

admin.post("/adminShow", jwtverify, (req, res) => {
  var id = req.userid;
  adminModel.findOne({ _id: id }, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    var data = {
      name: result.name,
      post: result.post,
    };
    res.status(200).json({ status: 0, data });
  });
});

admin.post("/adminRegister", (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var post = req.body.post;
  bcrypt.genSalt(10, (err, Salt) => {
    if (err) res.status(400).json({ status: -1 });
    bcrypt.hash(password, Salt, (err, hash) => {
      if (err) res.status(400).json({ status: -1 });
      var adminData = new adminModel({
        name: name,
        username: username,
        password: hash,
        post: post,
      });
      adminData.save((err, result) => {
        if (err) res.status(400).json({ status: -1 });
        res.status(200).json({ status: 0 });
      });
    });
  });
});

module.exports = admin;
