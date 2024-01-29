/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// Import multer
const multer = require("multer");
// We'll use this later to specify how we want to upload files.
const upload = multer();

// import models so we can interact with the database
const User = require("./models/user");
const Pin = require("./models/pin");
const DbFile = require("./models/DbFile");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

// const data = {};

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/pins", (req, res) => {
  // empty selector means get all pins
  // if (req.user._id){
  //   const id = req.user._id;
  // }else{
  //   const id = "";
  // }
  try {
    Pin.find({ creator_id: req.user._id }).then((pins) => res.send(pins.map((a) => a.content)));
  } catch (error) {}
});

router.post("/pin", auth.ensureLoggedIn, (req, res) => {
  const newPin = new Pin({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body, //this is the GeoJSON pin
  });

  newPin.save().then((pin) => res.send(pin));
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

// Here, we're saying that we have a route uploadFile.
// uploadFile expects 1 file to be uploaded, and for the form field that file is uploaded to to be named file (that's what the upload.single("file") means).
// Then, we declare our callback for how we'll handle the request like normal.
router.post("/uploadFile", upload.single("file"), (req, res) => {
  const image = new DbFile({ name: req.body.name, file: Buffer.from(req.file.buffer) });
  image
    .save()
    .then((image) => {
      res.status(200).send({});
    })
    .catch((err) => {
      console.log(`Failed to save image to database: ${err}`);
      res.status(500).send({ error: "failed to upload!" });
    });
});

// This code has no error handling and should really check that o !== null.
router.get("/file", (req, res) => {
  DbFile.findOne({ name: req.query.name })
    .then((o) => {
      res.send({ file: o.file.toString("base64") });
    })
    .catch((error) => {
      console.log(`Failed to search for file in MongoDB: ${error}`);
      res.status(400).send({ error: "Failed to search for file in MongoDB" });
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
