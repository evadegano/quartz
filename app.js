require("dotenv/config"); // get access to environment variables
require("./db"); // connects to the database
const passport = require("passport"); // handles authentication and authorization
const express = require("express"); // node framework to handle http requests
const app = express();
const cors = require("cors");


// import app middlewares
require("./config/index")(app);

// controls a very specific header to pass headers from the frontend
app.use(
  cors({
    credentials: true,
    origin: [process.env.ORIGIN || "http://localhost:3000"],
  })
);

// import passport middlewares
require('./passport/index')(app);

// import routes
const mainRoutes = require("./routes/index");
app.use("/api", mainRoutes);

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const userRoutes = require("./routes/user");
app.use("/api", userRoutes);

const recoveryRoutes = require("./routes/recovery");
app.use("/api", recoveryRoutes);

// Serve static files from client/build folder
app.use(express.static('client/build'));

// For any other routes: serve client/build/index.html SPA
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/client/build/index.html`, err => {
    if (err) next(err)
  })
});


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
