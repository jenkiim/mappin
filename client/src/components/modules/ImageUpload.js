// import React, { useState, useEffect } from "react";
// import FileBase64 from "react-file-base64";

// import { get } from "../../utilities";

// import TextInput from "./TextInput.js";

// import "../pages/Upload.css";
// import "./ImageUpload.css";

// const ImageUpload = (props) => {
//   const [file, setFile] = useState(undefined);
//   const [url, setUrl] = useState(undefined);

//   // have to change, this uploads whatever image named "anImage" shows up on website when we want the pic the user has currently uploaded
//   // useEffect(() => {
//   //   get("/api/picture", { name: "anImage" }).then(({ file }) => {
//   //     setUrl(file);
//   //   });
//   // }, []);

//   const handleUpload = (event) => {
//     event.preventDefault();
//     if (file === undefined) {
//       console.warn("Uploading file with no file set...");
//       return;
//     } // Now we know that we actually have a file to work with.

//     const formData = new FormData();
//     const imageBlob = new Blob([file], { type: "text/plain" }); // Build up a FormData object with a field for our file and a name.
//     formData.append("file", imageBlob);
//     formData.append("name", "anImage"); // Send that formData object to the uploadFile endpoint. It'll be encoded as multipart/form-data since we're sending a FormData as the body.
//     fetch("/api/uploadFile", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error uploading profile picture:", error);
//       });
//   };

//   // If the URL exists, make an image using the URL as a data URL for the image.
//   // Also add a button for uploading the image.
//   return (
//     <div className="Upload-container">
//       <div className="Upload-subcontainer">
//         <TextInput
//           addNewPin={props.addNewPin}
//           userId={props.userId}
//           file={file}
//           setFile={setFile}
//         />
//       </div>
//       <div className="Upload-subcontainer">
//         <div className="ImageUpload-buttons ImageUpload-container">
//           <div>
//             {" "}
//             <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setFile(base64)} />
//             {/* <button onClick={handleUpload}>Upload Profile Picture</button> */}
//           </div>
//           <div className="ImageUpload-imageContainer">
//             {url ? (
//               <img src={`${atob(url)}`} className="ImageUpload-uploadedPic" />
//             ) : (
//               "No image uploaded!"
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
