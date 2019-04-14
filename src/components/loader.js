import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderComponent = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <Spinner animation="border">
        <span> Loading... </span>
      </Spinner>
    );
  }
  return children ? children : null;
};

export default LoaderComponent;
