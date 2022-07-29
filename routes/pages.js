const express = require("express");
const page = express.Router();

page.get("/", (req, res) => {
  res.render("index.ejs");
});

page.get("/:page", (req, res) => {
  var page = req.params.page;
  if (page == "institute") res.render("institute-page.ejs");
  else if (page == "profile") res.render("login-page.ejs");
  else if (page == "contact") res.render("contact.ejs");
  else if (page == "visitors") res.render("visitors.ejs");
  else if (page == "forRecruiters") res.render("for-recruiters.ejs");
  else if (page == "contactPage") res.render("contact-page.ejs");
  else if (page == "directorPage") res.render("director-page.ejs");
  else if (page == "admin") res.render("admin-login.ejs");
  else if (page == "resume") res.render("resume-builder.ejs", { check: false });
});

module.exports = page;
