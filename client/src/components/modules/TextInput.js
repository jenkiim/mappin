import React, { useState } from 'react';
import './TextInput.css';

const TextInput = () => {
  // State to manage the input value
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



  return (<>
  <h1 className="Upload-infoTitle">Name:</h1>
  <div className="TextInput-infoBox">
      {/* Input element with value and onChange event */}
      <input 
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Pin Name..."
      />

      {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
      <p>You typed: {name}</p>
    </div>


    <h1 className="Upload-infoTitle">Description:</h1>
    <div className="TextInput-infoBox">
    {/* Input element with value and onChange event */}
    <input className="TextInput-bigBox"
    type="text"
    value={description}
    onChange={handleDescriptionChange}
    placeholder="Tell us about your pin!"
    />

    {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
    <p>You typed: {description}</p>
    </div>



    <h1 className="Upload-infoTitle">Location:</h1>
    <div className="TextInput-infoBox">
    {/* Input element with value and onChange event */}
    <input 
    type="text"
    value={location}
    onChange={handleLocationChange}
    placeholder="Where were you?"
    />

    {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
    <p>You typed: {location}</p>
    </div>

    


    <h1 className="Upload-infoTitle">Date:</h1>
    <div className="TextInput-infoBox">
    {/* Input element with value and onChange event */}
    <input 
    type="text"
    value={date}
    onChange={handleDateChange}
    placeholder="Date..."
    />

    {/* Displaying the current input value, NOT CONNECTED TO DB YET*/}
    <p>You typed: {date}</p>
    </div>

    

    <div>
    <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>


    </div>
  </>
    


  );
};

export default TextInput;