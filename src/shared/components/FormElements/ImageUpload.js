import React, { useRef } from "react";
import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
  const filePickerRef = useRef();

  const pickedHandler = (event) =>{
    console.log(event.target);
  }

  const pickImageHandler=()=>{
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        accept=".jpg,png,jpeg"
        type="file"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onclick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
    </div>
  );
};
export default ImageUpload;
