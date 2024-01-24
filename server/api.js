/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Pin = require("./models/pin");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const data = {};

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
  Pin.find({}).then((pins) => res.send(pins.map((a) => a.content)));
  // TODO: filter by userid
  // const filteredPins = data.pins.filter((pin) => comment.creator_id == req.query.creator_id);
  // res.send(filteredPins)
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
