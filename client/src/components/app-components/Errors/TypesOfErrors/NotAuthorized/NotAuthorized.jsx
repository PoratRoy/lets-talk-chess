import React from "react";
import { Link } from "react-router-dom";
import "./NotAuthorized.css";

const NotAuthorized = ({statusCode}) => {
  return (
    <>
      <div className="error-401-continer">
        <h1 className="error-401">{statusCode}</h1>
        <div className="error-401-info">
          You are not authorized to enter this page!
        </div>
        <Link className="error-401-link link" to="/">
          Return to login
        </Link>
      </div>
    </>
  );
};

export default NotAuthorized;
