import React from "react";
import logo from "../../public/MapPin_Logo.png";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./login.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "48367706903-o5qcuf14etkc6bfl7ms4abq4vssg2234.apps.googleusercontent.com";

const login = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className>
      <img src={logo} alt="MapPin Logo" className="login-logo" />
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
  );
};

export default login;
