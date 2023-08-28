import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";
import Button from "./Button"; 

const ImageUpload = (props) => {
  // Creating a reference to the file input element
  const filePickerRef = useRef();

  // State variables to manage the selected file, image URL, and validity
  const [file, setFile] = useState();
  const [url, setUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  // useEffect to update the image URL when a new file is selected
  useEffect(() => {
    if (!file) {
      return;
    }

    // Creating a new FileReader to read the selected file
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUrl(fileReader.result); // Setting the URL to the read data
    };
    fileReader.readAsDataURL(file); // Initiating the read operation
  }, [file]);

  // Function to handle the selection of a file
  const pickedHandler = (event) => {
    let pickedFile;
    let valid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile); // Setting the selected file
      setIsValid(true); // Marking the input as valid
      valid = true;
    } else {
      setIsValid(false); // Marking the input as invalid
      valid = false;
    }

    // Calling the onInput function from props to communicate with parent component
    props.onInput(props.id, pickedFile, valid);
  };

  // Function to trigger the file input when the "Pick Image" button is clicked
  const pickImageHandler = () => {
    filePickerRef.current.click(); // Programmatically triggering the file input click
  };

  return (
    <div className="form-control">
      {/* Hidden file input element */}
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        accept=".jpg,png,jpeg"
        type="file"
        onChange={pickedHandler}
      />

      {/* Container for the image upload UI */}
      <div className={`image-upload ${props.center && "center"}`}>
        {/* Preview of the selected image */}
        <div className="image-upload__preview">
          {url && <img src={url} alt="Preview" />} {/* Displaying the image if URL exists */}
          {!url && <p>Please pick an image.</p>} {/* Message if no image is selected */}
        </div>

        {/* Button to initiate image selection */}
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>

      {/* Displaying an error message if input is invalid */}
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
