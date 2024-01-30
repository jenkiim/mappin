import React from "react";
import TextInput from "../modules/TextInput.js";
import "./Upload.css";

const Upload = (props) => {
  return (
    <div>
      <TextInput addNewPin={props.addNewPin} userId={props.userId} />
      {/* <UploadInput addNewPin={props.addNewPin} userId={props.userId} /> */}
    </div>
  );
};

export default Upload;
