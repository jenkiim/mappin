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

  // Need to use the navigate function
  const navigate = useNavigate();

  // navigates to upload page when the user hits the Plus Button for a new post
  const handleAdd = (event) => {
    navigate("/upload");
    console.log("clicked to upload");
    setValue("");
  };

  // idk why but the picture won't be the button :( (also gave up and added button to nav bar...)
  return (
    <div className="u-flex-justifyLeft">
      <button
        type="submit"
        src="plus_button.png"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleAdd}
      >
        Upload Pin
      </button>
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
