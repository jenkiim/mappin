import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./UploadButton.css";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const UploadButton = () => {
  // Need to use the navigate function
  const navigate = useNavigate();

  // navigates to upload page when the user hits the Plus Button for a new post
  const handleClick = (event) => {
    navigate("/upload");
    console.log("clicked to upload");
  };

  // idk why but the picture won't be the button :( (also gave up and added button to nav bar...)
  return (
    <div className="u-flex-justifyLeft">
      <button
        type="submit"
        src="plus_button.png"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleClick}
      >
        Upload Pin
      </button>
    </div>
  );
};

export default UploadButton;
