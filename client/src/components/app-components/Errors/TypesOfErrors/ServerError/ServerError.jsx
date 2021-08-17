import React from "react";
import { Link } from "react-router-dom";
import "./ServerError.css";

const ServerError = ({statusCode}) => {
  return (
    <>
      <div className="error-500-continer">
        <h1 className="error-500">{statusCode}</h1>
        <h3 className="error-500-title">Server Error</h3>
        <div className="error-500-info">
          Oops, something went wrong.
        </div>
        <Link className="error-500-link link" to="/">
          Return to login
        </Link>
      </div>
    </>
  );
};

export default ServerError;
