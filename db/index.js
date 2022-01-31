// responsible for the connection with mongodb
const mongoose = require("mongoose");

// MongoDB URI for our app to have access to it.
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/quartz";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
