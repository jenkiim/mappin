import React, { useState } from "react";

import "./TextInput.css";
import { useNavigate } from "react-router-dom";
import { convertToGeoJSON } from "./ConvertGeoJSON.js";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * REPLACEEEEEEEEEEE
 *
 * Proptypes
 * @param {function} addNewPin allows us to add a new pin to the list of pins
 *  @param {String} userId allows us to add a new pin to the list of pins
 */
const TextInput = (props) => {
  // States to manage input values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");

  // Event handler for changes in input
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };
  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  //handle submissions
  const handleSubmit = (event) => {
    event.preventDefault();
    let newPin = {
      creator_id: props.userId,
      name: name,
      description: description,
      latitude: latitude,
      longitude: longitude,
      date: date,
    };
    newPin = convertToGeoJSON(newPin);
    post("/api/pin", newPin).then((pin) => {
      // display this pin on the screen
      props.addNewPin(newPin);
    });
    setName("");
    setDescription("");
    setLatitude("");
    setLongitude("");
    setDate("");
  };

  // Need to use the navigate function
  const navigate = useNavigate();

  // navigates to upload page when the user hits the Plus Button for a new post
  const handleCancel = (event) => {
    navigate("/");
    console.log("clicked to cancel upload");
    setName("");
    setDescription("");
    setLongitude("");
    setLatitude("");
    setDate("");
  };
  if (props.userId){

    return (
      <>
        {/* TITLE AND TEXT BOX FOR NAME INPUT*/}
        <h1 className="Upload-infoTitle">Name:</h1>
        <div className="TextInput-infoBox">
          <input type="text" value={name} onChange={handleNameChange} placeholder="Pin Name..." />
          {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
          <p>You typed: {name}</p>
        </div>

        {/* TITLE AND TEXT BOX FOR DESCRIPTION INPUT*/}
        <h1 className="Upload-infoTitle">Description:</h1>
        <div className="TextInput-infoBox">
          <input
            className="TextInput-bigBox"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Tell us about your pin!"
          />
          {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
          <p>You typed: {description}</p>
        </div>

        {/* TITLE AND TEXT BOX FOR LOCATION INPUT*/}
        <h1 className="Upload-infoTitle">Location:</h1>
        {/* Latitude */}
        <div className="TextInput-infoBox">
          <input
            type="text"
            value={latitude}
            onChange={handleLatitudeChange}
            placeholder="Where were you? (latitutde)"
          />
          {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
          <p>You typed: {latitude}</p>
        </div>

        {/* Longitude */}
        <div className="TextInput-infoBox">
          <input
            type="text"
            value={longitude}
            onChange={handleLongitudeChange}
            placeholder="Where were you? (longitude)"
          />
          {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
          <p>You typed: {longitude}</p>
        </div>

        {/* TITLE AND TEXT BOX FOR DATE INPUT*/}
        <h1 className="Upload-infoTitle">Date:</h1>
        <div className="TextInput-infoBox">
          <input type="text" value={date} onChange={handleDateChange} placeholder="Date..." />
          {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
          <p>You typed: {date}</p>
        </div>

        {/*submit button*/}
        <div>
          <button
            type="submit"
            className="NewPostInput-button u-pointer TextInput-sub"
            value="Submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="submit"
            className="NewPostInput-button u-pointer "
            value="Submit"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </>
    );
  }

  return (<>
    <h3>Please log in to create a new pin.</h3>
    <button
      type="submit"
      className="NewPostInput-button u-pointer "
      value="Submit"
      onClick={handleCancel}
    >
      Home
    </button>
  </>)
};




export default TextInput;
// export { AddPin };
