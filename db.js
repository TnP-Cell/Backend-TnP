const mongoose = require("mongoose");

// database url
// const url = "mongodb://localhost:27017/tnp";
const url =
  "mongodb+srv://tnpcell:TnpCell%40iiitbh@tnp.nlrfhim.mongodb.net/tnp?retryWrites=true&w=majority";

// database connection to our node server
const connect = async () => {
  try {
    await mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        console.log("DataBase Connected");
      }
    );
  } catch (error) {
    console.log("Data Base is not connected");
  }
};

module.exports = connect;
