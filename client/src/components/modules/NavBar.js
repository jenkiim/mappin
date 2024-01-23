import React, { useState, useEffect, useRef } from "react";
//import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { NewEntry } from "./NewEntryInput.js";

import "./NavBar.css";
import logo from "./logo.png";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "48367706903-o5qcuf14etkc6bfl7ms4abq4vssg2234.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ props, userId, handleLogin, handleLogout }) => {
  const [entries, setEntries] = useState([]);

  const addNewEntry = (entryObj) => {
    setEntries([entryObj].concat(entries));
  };

  return (
    <nav className="NavBar-container">
      <NewEntry addNewEntry={addNewEntry} className="col" />
      <div className="NavBar-title u-inlineBlock">
        <img src={logo} className="NavBar-smallPic" />
      </div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {userId ? (
            <button
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};

export default NavBar;
