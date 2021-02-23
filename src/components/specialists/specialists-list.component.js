import React, { Component } from "react";
import SpecialistDataService from "../../services/specialist.service";
import { Link } from "react-router-dom";

export default class SpecialistList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSpecialists = this.retrieveSpecialists.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSpecialist = this.setActiveSpecialist.bind(this);
    this.deleteSpecialist = this.deleteSpecialist.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      specialists: [],
      currentSpecialist: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveSpecialists();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({ searchName });
  }

  retrieveSpecialists() {
    SpecialistDataService.getAll()
      .then(response => {
        console.log(response);
        this.setState({
          specialists: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  refreshList() {
    this.retrieveSpecialists();
    this.setState({
      currentSpecialist: null,
      currentIndex: -1
    });
  }

  setActiveSpecialist(specialist, index) {
    this.setState({
      currentSpecialist: specialist,
      currentIndex: index
    });
  }

  deleteSpecialist(id) {
    SpecialistDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(err => console.error(err));
  }

  searchName() {
    if (!this.state.searchName) {
      this.retrieveSpecialists();
      return;
    }

    SpecialistDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          specialists: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    const { searchName, specialists, currentSpecialist, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Specialists List</h4>

          <ul className="list-group">
            {specialists  && specialists.map((specialist, index) => {
              return <li
                className={
                  `list-group-item ${index === currentIndex ? 'active' : ''}`
                }
                onClick={() => this.setActiveSpecialist(specialist, index)}
                key={index}
              >
                {specialist.fullName}
              </li>
            })}
          </ul>

          <Link
            className="m-3 btn btn-success"
            to="/add-specialist"
          >
            Create
          </Link>
        </div>

        <div className="col-md-6">
          {currentSpecialist ? (
            <div>
              <h4>Specialist</h4>
              <div>
                <label>
                  <strong>First Name:</strong>
                </label>{" "}
                {currentSpecialist.firstName}
              </div>
              <div>
                <label>
                  <strong>Last Name:</strong>
                </label>{" "}
                {currentSpecialist.lastName}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentSpecialist.phone}
              </div>
              <div>
                <label>
                  <strong>Country:</strong>
                </label>{" "}
                {currentSpecialist.country}
              </div>
              <div>
                <label>
                  <strong>Occupation:</strong>
                </label>{" "}
                {currentSpecialist.occupation}
              </div>
              {
                !currentSpecialist.title ?
                  null :
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentSpecialist.title}
                  </div>
              }

              <Link
                to={"/specialists/" + currentSpecialist.id}
                className="badge badge-warning mr-3"
              >
                Edit
              </Link>

              <button
                className="btn badge badge-danger"
                onClick={() => this.deleteSpecialist(currentSpecialist.id)}
              >
                Delete
              </button>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Specialist...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
