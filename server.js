const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const connect = require("./db");
const cors = require("cors");
const app = express();
connect();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", require("./routes/pages"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.use("/api", require("./routes/profile"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/news", require("./routes/news"));
app.use("/api/events", require("./routes/events"));
// app.use("/api", require("./routes/resume"));

var port = process.env.PORT || 5000;
app.listen(port, process.env.IP, () => {
  console.log("Server is running at port: " + port);
});
