const express = require("express");
const admin = express.Router();
const bcrypt = require("bcryptjs");
const adminModel = require("../models/adminModel");

admin.post("/adminLogin", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
});
