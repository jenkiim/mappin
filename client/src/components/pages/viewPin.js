import React, { useState } from "react";

import "./viewPin.css";
import { useNavigate } from "react-router-dom";
import placeholderPhoto from "./placeholder.png";
import { get } from "../../utilities";

/*
 *props:
 *userId
 *clickedPin
 */

const ViewPin = (props) => {
  const [picture, setPicture] = useState("");

  // Need to use the navigate function
  const navigate = useNavigate();

  //handle submissions
  const handleX = (event) => {
    event.preventDefault();
    navigate("/");
  };
  let file = props.clickedPin.properties.file;
  return (
    <div>
      <div className="viewPin-infoContainer">
        <div className="viewPin-photoContainer photoMargs">
          {file ? <img src={`${atob(file)}`} className="viewPin-photo" /> : null}
        </div>
        <h1 className="viewPin-pinName margs">{props.clickedPin.properties.name}</h1>
        <p className="viewPin-pinDescription margs">{props.clickedPin.properties.description}</p>
        <p className="viewPin-date margs">Created {props.clickedPin.properties.date}</p>
      </div>
      {/* <div>
                <h1 className="viewPin-infoContainer">map placeholder</h1>
            </div> */}
      <div>
        <button type="submit" className="margs" value="Submit" onClick={handleX}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default ViewPin;
