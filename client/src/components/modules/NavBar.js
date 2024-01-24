import React, { useState, useEffect, useRef } from "react";
//import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import UploadButton from "./UploadButton.js";

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

  const buttonStyle = {
    color: "#6fa8dc",
    padding: "18px 15px",
    cursor: "pointer",
    background: "none",
    border: "1px solid",
  };

  return (
    <nav className="NavBar-container">
      {/* <NewEntry addNewEntry={addNewEntry} className="col" /> */}
      <UploadButton />
      <div className="NavBar-title u-inlineBlock">
        <img src={logo} className="NavBar-smallPic" />
      </div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {userId ? (
            <button
              style={buttonStyle}
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
