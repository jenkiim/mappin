import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NewEntryInput.css";
import { post } from "../../utilities.js";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewEntryInput = (props) => {
  const [value, setValue] = useState("");

  // // called whenever the user types in the new post input box
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  // called when the user hits the Plus Button for a new post
  const handleAdd = (event) => {
    // props.onSubmit && props.onSubmit(value);
    // useNavigate("/upload");
    console.log("clicked to upload");
    setValue("");
  };

  return (
    <div className="u-flex-justifyLeft">
      {/* <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      /> */}
      <button
        type="submit"
        src="plus_button.png"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleAdd}
      />
    </div>
  );
};

/**
 * New Entry is a New Entry component for a new entry
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewEntry = (props) => {
  const addEntry = (value) => {
    const body = { content: value };
    post("/api/entry", body).then((entry) => {
      // display this entry on the screen
      props.addNewEntry(entry);
    });
  };

  return <NewEntryInput defaultText="New Pin" onSubmit={addEntry} />;
};

export { NewEntry };
