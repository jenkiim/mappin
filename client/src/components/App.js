import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Map from "./pages/Map.js";
import NavBar from "./modules/NavBar.js";
import Upload from "./pages/Upload.js";
//import Login from "./pages/login.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(null);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(null);
    post("/api/logout");
  };

  // this gets called when the user uploads new pin, so their
  // pin gets added to the map right away
  const addNewPin = (pinObj) => {
    console.log("new pin added in app.js");
    setPins([pinObj].concat(pins));
  };

  return (
    <div>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <Routes>
        <Route path="/" element={<Map pins={pins} addNewPin={addNewPin} setPins={setPins} />} />
        <Route path="/upload" element={<Upload pins={pins} addNewPin={addNewPin} userId={userId}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
