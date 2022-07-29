const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const connect = require("./db");
const app = express();
connect();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", require("./routes/pages"));
app.use("/", require("./routes/profile"));
app.use("/", require("./routes/resume"));

var port = process.env.PORT || 5000;
app.listen(port, process.env.IP, () => {
  console.log("Server is running at port: " + port);
});
