import React, { useState, useEffect, useRef } from "react";
//import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { NewEntry } from "./NewEntryInput.js";

import "./NavBar.css";
import logo from "./logo.png";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "48367706903-o5qcuf14etkc6bfl7ms4abq4vssg2234.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
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
        {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
