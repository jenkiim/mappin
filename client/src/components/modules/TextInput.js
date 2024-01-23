import React, { useState } from 'react';
import './TextInput.css';
import { useNavigate } from "react-router-dom";

const TextInput = () => {
  // States to manage input values
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');


  // Event handler for changes in input
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };


  //handle submissions
  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
        name: name,
        description: description,
        location: location,
        date: date,
    }
    props.onSubmit && props.onSubmit(newEntry);
    setName("");
    setDescription("");
    setLocation("");
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
    setLocation("");
    setDate("");
  };



  return (<>

    {/* TITLE AND TEXT BOX FOR NAME INPUT*/}
    <h1 className="Upload-infoTitle">Name:</h1>
    <div className="TextInput-infoBox">
      <input 
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Pin Name..."
      />
      {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
      <p>You typed: {name}</p>
    </div>


    {/* TITLE AND TEXT BOX FOR DESCRIPTION INPUT*/}
    <h1 className="Upload-infoTitle">Description:</h1>
    <div className="TextInput-infoBox">
        <input className="TextInput-bigBox"
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
    <div className="TextInput-infoBox">
        <input 
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Where were you?"
        />
        {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
        <p>You typed: {location}</p>
    </div>

    {/* TITLE AND TEXT BOX FOR DATE INPUT*/}
    <h1 className="Upload-infoTitle">Date:</h1>
    <div className="TextInput-infoBox">
        <input 
        type="text"
        value={date}
        onChange={handleDateChange}
        placeholder="Date..."
        />
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
        >Submit
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
};

export default TextInput;






