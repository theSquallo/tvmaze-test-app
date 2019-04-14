import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Navbar, Form, Button, FormControl } from "react-bootstrap";
import * as appActions from "../actions/appActions";
import * as pageActions from "../actions/paginationActions";
import ShowsList from "./showsList";
import ModalComponent from "./modalContainer";
import { ITEMS_PER_PAGE } from "../constants/config";
import PaginatedList from "./paginatedList";

class LayoutContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showsArr: [],
      searchQuery: "",
      searchClicked: false
    };

    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.getShows(0);
  }

  componentWillReceiveProps(nextProps) {
    const { showsList, searchShows, pageInfo } = nextProps;
    if (showsList.response)
      if (!pageInfo.maxPage) {
        const maxPage = Math.ceil(showsList.response.length / ITEMS_PER_PAGE);
        this.props.setMaxPages(maxPage);
      }
    if (
      !searchShows.isLoading &&
      searchShows.response &&
      this.state.showsArr.length === 0
    ) {
      this.setState({
        showsArr: searchShows.response
      });
    }
  }

  handleSearchBarChange(e) {
    this.setState({
      searchClicked: false,
      searchQuery: e.target.value,
      showsArr: []
    });
  }

  handleSearch() {
    this.props.searchShowsReq(this.state.searchQuery);
    this.setState({
      searchClicked: true
    });
  }

  render() {
    const { showsList, pageInfo } = this.props;
    let shows;
    if (this.state.showsArr.length > 0 && this.state.searchClicked) {
      shows = this.state.showsArr;
    } else {
      shows = showsList.response;
    }
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>TV Maze API Application</Navbar.Brand>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={this.state.searchQuery}
              onChange={this.handleSearchBarChange}
            />
            <Button variant="outline-light" onClick={this.handleSearch}>
              Search
            </Button>
          </Form>
        </Navbar>
        <Container style={{ marginTop: 5 }}>
          {this.state.showsArr.length > 0 && this.state.searchClicked ? (
            <ShowsList shows={shows} isLoading={showsList.isLoading} />
          ) : (
            pageInfo.maxPage && (
              <PaginatedList
                shows={shows}
                pageInfo={pageInfo}
                isLoading={showsList.isLoading}
              />
            )
          )}
        </Container>
        <ModalComponent />
      </div>
    );
  }
}

export default connect(
  state => ({
    showsList: state.tvMazeShows.showsList,
    searchShows: state.tvMazeShows.searchShows,
    pageInfo: state.tvMazeShows.pageInfo
  }),
  { ...appActions, ...pageActions }
)(LayoutContainer);
