import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
      <div className="error-404-continer">
        <h1 className="error-404">404</h1>
        <h3 className="error-404-title">Page Not Found</h3>
        <div className="error-404-info">The Page you are looking for doesn't exist or an other error occured.</div>
        <Link className="error-404-link link" to="/">Return to login</Link>
      </div>
    </>
  );
};

export default PageNotFound;
