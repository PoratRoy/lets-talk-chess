import React from "react";
import { Link } from "react-router-dom";
import "./DefaultError.css";

const DefaultError = ({statusCode, msg}) => {
  return (
    <>
      <div className="error-continer">
        <h1 className="error-number">{statusCode}</h1>
        <h3 className="error-title">{msg}</h3>
        <Link className="error-link link" to="/">Return to login</Link>
      </div>
    </>
  );
};

export default DefaultError;