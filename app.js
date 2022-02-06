require("dotenv/config"); // get access to environment variables
require("./db"); // connects to the database
const passport = require("passport"); // handles authentication and authorization
const express = require("express"); // node framework to handle http requests
const app = express();

// import app middlewares
require("./config/index")(app);

// import passport middlewares
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// import routes
const mainRoutes = require("./routes/index");
app.use("/api", mainRoutes);

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const userRoutes = require("./routes/user");
app.use("/api", userRoutes);

const recoveryRoutes = require("./routes/recovery");
app.use("/api", recoveryRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
