import React from "react";
import { Row, Col } from "react-bootstrap";
import ShowCard from "./showCard";
import LoaderComponent from "./loader";

const ShowsList = ({ shows, isLoading }) => {
  const showsCols = shows
    ? shows.map(show => (
        <Col key={show.id} md={3}>
          <ShowCard show={show} />
        </Col>
      ))
    : null;

  return (
    <Row>
      {showsCols}
      <LoaderComponent isLoading={isLoading} />
    </Row>
  );
};

export default ShowsList;
