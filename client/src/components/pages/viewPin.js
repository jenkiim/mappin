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
    return (
        <div>
            <div className="viewPin-infoContainer">
                <div className="viewPin-photoContainer photoMargs">
                    <img src={placeholderPhoto} className="viewPin-photo"/> {/*images associated with pinned location*/}
                </div>
                <h1 className="viewPin-pinName margs">Pin Name Placeholder</h1>
                <p className = "viewPin-pinDescription margs">pin description placeholder- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className="viewPin-date margs">Created 01/29/2024</p>
                {/* <h1>{props.clickedPin.content.properties.name}</h1>
                <p>{props.clickedPin.content.properties.description}</p> */}

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
