const express = require("express");
const fs = require("fs");
const path = require("path");
const profile = express.Router();
const studProf = require("../models/studentProfile");
const upload = require("../middleware/fileUpload");

profile.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  studProf.findOne({ email: username }, (err, result) => {
    if (err) throw err;
    if (result.password === password)
      res.render("student-page.ejs", { result: result });
    else res.redirect("/");
  });
});

profile.post("/register", upload.single("resume"), async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var branch = req.body.branch;
  var roll = req.body.roll;
  var cgpa = req.body.cgpa;
  var phone = req.body.phone;
  var linkedin = req.body.linkedin;
  var github = req.body.github;

  var prof = new studProf({
    name: name,
    email: email,
    password: password,
    branch: branch,
    roll: roll,
    cgpa: cgpa,
    phone: phone,
    linkedin: linkedin,
    github: github,
    resume: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "pdf",
    },
  });

  await prof.save((err, result) => {
    if (err) throw err;
    console.log("Profile Uploaded");
    fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename));
    res.redirect("/profile");
  });
});

module.exports = profile;
