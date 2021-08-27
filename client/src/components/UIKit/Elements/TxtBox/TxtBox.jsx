import React from "react";
import "./TxtBox.css";

const TxtBox = ({ clsText,type, value, setValue, placeholder, children }) => {


  return (
    <div className="txt-box-continer">
      <input
        className={`txt ${clsText}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="on"
      />
      {children}
    </div>
  );
};

export default TxtBox;
