const express = require("express"); // gives access to the `body` property in requests
const session = require("express-session"); // handles user sessions
const MongoStore = require("connect-mongo"); // to store session in Mongo
const logger = require("morgan"); // for messages in the terminal as requests are coming in
const cookieParser = require("cookie-parser"); // deals with cookies

// needed to accept from requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request if from the same domain, by default express wont accept POST requests
const cors = require("cors");

// handles decentralized databases
const Gun = require("gun");

// middleware configuration
module.exports = (app) => {
  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like heroku use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );

  // enables authentication using session + passport
  app.use(session({
    secret: "Quartz secret code",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    })
  }));

  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  // decentralized dabatases
  app.use(Gun.serve);
};
