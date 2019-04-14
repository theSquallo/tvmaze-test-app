import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { openShowDetail } from "../actions/modalActions";
import { NO_IMG_URL } from "../constants/config";

class ShowCard extends Component {
  render() {
    const { show, openShowDetail } = this.props;

    return (
      <Card
        bg="primary"
        text="light"
        title={show.name}
        onClick={() => openShowDetail(show.id)}>
        <Card.Img variant="top" src={show.image ? show.image.medium : NO_IMG_URL} />
        <Card.Body>{show.name}</Card.Body>
        <Card.Text>Genres: {show.genres.join(", ")}</Card.Text>
        {show.rating.average ? (
          <Card.Text>Rating: {show.rating.average}/10</Card.Text>
        ) : (
          <Card.Text>Rating: undefined</Card.Text>
        )}
      </Card>
    );
  }
}

export default connect(
  state => ({
    showDetail: state.tvMazeShows.showDetail
  }),
  { openShowDetail }
)(ShowCard);
