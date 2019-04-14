import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import _ from "lodash";
import { closeShowDetail } from "../actions/modalActions";
import { getShowInfo } from "../actions/appActions";
import LoaderComponent from "./loader";

class ModalComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.showId && this.props.showId !== nextProps.showId) {
      nextProps.getShowInfo(nextProps.showId);
    }
  }

  render() {
    const { isOpen, closeShowDetail, isLoading } = this.props;
    const show = this.props.show;
    const days = show.schedule ? show.schedule.days : null;
    const time = show.schedule ? show.schedule.time : null;
    const image = show.image ? show.image.original : null;
    const cast = show._embedded
      ? show._embedded.cast.map(item => (
          <tr>
            <td>
              <img
                className="img-responsive"
                alt="Show image"
                src={item.person.image ? item.person.image.medium : null}
                width="105"
                height="142.5"
                hspace="5"
              />
            </td>
            <td>
              {item.person.name} as {item.character.name}
            </td>
          </tr>
        ))
      : null;

    return (
      <Modal
        show={isOpen}
        onHide={closeShowDetail}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        variant="dark">
        <LoaderComponent isLoading={isLoading}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {show.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p style={{ float: "left" }}>
                <img
                  className="img-responsive"
                  alt="Show poster"
                  src={image}
                  width="340"
                  height="500"
                  hspace="5"
                />
              </p>
              <p
                style={{
                  textAlign: "justify"
                }}>
                <div dangerouslySetInnerHTML={{ __html: show.summary }} />
                <hr />
                <p>
                  <b>Language: </b> {show.language}
                </p>
                <hr />
                <p>
                  <b>Genres: </b> {show.genres ? show.genres.join(", ") : null}
                </p>
                <hr />
                <p>
                  <b>Premiered: </b> {show.premiered}{" "}
                </p>
                <hr />
                <p style={{ textAlign: "left" }}>
                  <b>Official site: </b>{" "}
                  <a href={show.officialSite} name={show.name}>
                    {show.officialSite}{" "}
                  </a>
                </p>
                <hr />
                <p>
                  <b>Schedule: </b>
                  Every {days ? days[0] : null} - {time}
                </p>
                <hr />
              </p>
            </div>
            <div style={{ clear: "left" }}>
              <p>
                <b>Cast:</b>
              </p>
              <table>{cast}</table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeShowDetail}>Close</Button>
          </Modal.Footer>
        </LoaderComponent>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    isOpen: _.get(state, "tvMazeShows.showDetail.isOpen", false),
    showId: _.get(state, "tvMazeShows.showDetail.showId"),
    show: _.get(state, "tvMazeShows.showInfo.response", {}),
    isLoading: _.get(state, "tvMazeShows.showInfo.isLoading", false)
  }),
  { closeShowDetail, getShowInfo }
)(ModalComponent);
