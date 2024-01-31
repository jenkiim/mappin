import React, { useState } from "react";
import FileBase64 from "react-file-base64";

import "./TextInput.css";
import { useNavigate } from "react-router-dom";

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
  const [file, setFile] = useState("");

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
      name: name,
      description: description,
      latitude: latitude,
      longitude: longitude,
      date: date,
    };
    newPin = convertToGeoJSON(newPin);
    const formData = new FormData();
    const imageBlob = new Blob([file], { type: "text/plain" }); // Build up a FormData object with a field for our file and a name.
    formData.append("file", imageBlob);
    formData.append("pin", JSON.stringify(newPin));
    console.log("formdata", formData);
    fetch("/api/pin", {
      method: "POST",
      body: formData,
    }).then((pin) => {
      props.addNewPin(newPin);
    });

    // reset everything
    setName("");
    setDescription("");
    setLatitude("");
    setLongitude("");
    setDate("");
    setFile("");
    navigate("/");

    // image upload
    if (file === undefined) {
      console.log("here");
      navigate("/");
      return;
    }
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
  if (props.userId) {
    return (
      <div className="Upload-container">
        <div className="Upload-subcontainer">
          <div className="TextInput-container Upload-subcontainer">
            {/* TITLE AND TEXT BOX FOR NAME INPUT*/}
            <h1 className="Upload-infoTitle">Name:</h1>
            <div className="TextInput-infoBox">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Pin Name..."
              />
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
            </div>

            {/* TITLE AND TEXT BOX FOR LOCATION INPUT*/}
            <div className="TextInput-container TextInput-space">
              <h1 className="Upload-infoTitle">Location:</h1>
              {/* Latitude */}
              <div className="TextInput-infoBox">
                <input
                  className="TextInput-longerBox"
                  type="text"
                  value={latitude}
                  onChange={handleLatitudeChange}
                  placeholder="Location latitude (N is positive, S is negative)"
                />
              </div>

              {/* Longitude */}
              <div className="TextInput-infoBox">
                <input
                  className="TextInput-longerBox"
                  type="text"
                  value={longitude}
                  onChange={handleLongitudeChange}
                  placeholder="Location longitude (E is positive, W is negative)"
                />
              </div>
            </div>

            <div className="TextInput-container TextInput-space">
              {/* TITLE AND TEXT BOX FOR DATE INPUT*/}
              <h1 className="Upload-infoTitle">Date:</h1>
              <div className="TextInput-infoBox">
                <input type="text" value={date} onChange={handleDateChange} placeholder="Date..." />
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
            </div>
          </div>
        </div>
        <div className="Upload-subcontainer">
          <div className="TextInput-buttons TextInput-imageUploadContainer">
            <div>
              {" "}
              <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setFile(base64)} />
            </div>
            <div className="TextInput-imageContainer">
              {file ? <img src={file} className="TextInput-uploadedPic" /> : "No image uploaded!"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3>Please log in to create a new pin.</h3>
      <button
        type="submit"
        className="NewPostInput-button u-pointer "
        value="Submit"
        onClick={handleCancel}
      >
        Home
      </button>
    </>
  );
};

function convertToGeoJSON(input) {
  const { latitude, longitude, ...properties } = input;
  const object = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
    properties: properties,
  };
  return object;
}

// function convertPicture(file) {
//   const formData = new FormData();
//   const imageBlob = new Blob([file], { type: "text/plain" }); // Build up a FormData object with a field for our file and a name.
//   formData.append("file", imageBlob);
//   return formData;
// }

export default TextInput;
export { convertToGeoJSON };
