import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Pagination } from "react-bootstrap";
import ShowsList from "./showsList";
import * as pageActions from "../actions/paginationActions";
import { ITEMS_PER_PAGE } from "../constants/config";
import LoaderComponent from "./loader";

class PaginatedList extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(page) {
    this.props.changePage(page);
  }

  render() {
    let items = [];
    const { currentPage, maxPage } = this.props.pageInfo;
    for (let i = 1; i <= maxPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => this.props.changePage(i)}>
          {i}
        </Pagination.Item>
      );
    }

    let pageContent = [];
    if (this.props.shows) {
      for (
        let i =
          currentPage === 1
            ? currentPage - 1
            : (currentPage - 1) * ITEMS_PER_PAGE;
        i < currentPage * ITEMS_PER_PAGE;
        i++
      ) {
        pageContent.push(this.props.shows[i]);
      }
    }
    
    return (
      <Row>
        <Pagination>
          <Pagination.First onClick={() => this.props.changePage(1)} />
          <Pagination.Prev
            onClick={() =>
              currentPage > 1 ? this.props.changePage(currentPage - 1) : null
            }
          />
          {items}
          <Pagination.Next
            onClick={() =>
              currentPage < maxPage
                ? this.props.changePage(currentPage + 1)
                : null
            }
          />
          <Pagination.Last onClick={() => this.props.changePage(maxPage)} />
        </Pagination>
        <ShowsList shows={pageContent} isLoading={this.props.isLoading} />
        <LoaderComponent isLoading={this.props.isLoadingisLoading} />
      </Row>
    );
  }
}

export default connect(
  state => ({
    pageInfo: state.tvMazeShows.pageInfo
  }),
  { ...pageActions }
)(PaginatedList);
