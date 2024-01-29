import React, { useState } from "react";

import "./TextInput.css";
import { useNavigate } from "react-router-dom";
import { convertToGeoJSON } from "./ConvertGeoJSON.js";
import { post } from "../../utilities";

/*
*props: 
*userId
*pinObj
*/

const ViewPin = (props) => {
    // Need to use the navigate function
    const navigate = useNavigate();

        //handle submissions
    const handleX = (event) => {
        event.preventDefault();
        navigate("/");
    };
    return (
        <div>
            <div>
                <img src=""/> {/*images associated with pinned location*/}
                <h1>{props.pinObj.content.properties.name}</h1>
                <p>{props.pinObj.content.properties.description}</p>

            </div>
            <div>
                <button
                    type="submit"
                    className="NewPostInput-button u-pointer TextInput-sub x-button"
                    value="Submit"
                    onClick={handleX}
                >
                    X
                </button>
                </div>
        </div>
    );
};

export default ViewPin;
