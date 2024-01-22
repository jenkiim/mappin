import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import createNew from "./CreateNewPin.png"


import "../../utilities.css";
import "./NewPin.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "48367706903-o5qcuf14etkc6bfl7ms4abq4vssg2234.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
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
      <img src={createNew} class="center"/>
      <img src={createNew} class="NewPin-InputInfo"/>
      <img src={createNew} class="NewPin-InputInfo"/>
      <img src={createNew} class="NewPin-InputInfo"/>
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
