import React, { useState } from "react";

import "./viewPin.css";
import { useNavigate } from "react-router-dom";
import placeholderPhoto from "./placeholder.png";


/*
*props: 
*userId
*clickedPin
*/

const ViewPin = (props) => {
    // Need to use the navigate function
    const navigate = useNavigate();

        //handle submissions
    const handleX = (event) => {
        event.preventDefault();
        navigate("/");
    };
    console.log("here")
    console.log(props)
    console.log(props.clickedPin.properties.name)
    return (
        <div>
            <div className="viewPin-infoContainer">
                <div className="viewPin-photoContainer photoMargs">
                    <img src={placeholderPhoto} className="viewPin-photo"/> {/*images associated with pinned location*/}
                </div>
                <h1 className="viewPin-pinName margs">{props.clickedPin.properties.name}</h1>
                <p className = "viewPin-pinDescription margs">{props.clickedPin.properties.description}</p>
                <p className="viewPin-date margs">Created {props.clickedPin.properties.date}</p>


            </div>
            {/* <div>
                <h1 className="viewPin-infoContainer">map placeholder</h1>
            </div> */}
            <div>
                <button
                    type="submit"
                    className="margs"
                    value="Submit"
                    onClick={handleX}
                >
                    Exit
                </button>
                </div>
        </div>
    );
};

export default ViewPin;
