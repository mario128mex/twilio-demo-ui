import React, { Component } from "react";
import { Link } from "react-router-dom";
import SpecialistDataService from "../services/specialist.service";

export default class Specialist extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeOccupation = this.onChangeOccupation.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.getSpecialist = this.getSpecialist.bind(this);
    this.updateSpecialist = this.updateSpecialist.bind(this);

    this.state = {
      currentSpecialist: {
        id: null,
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        occupation: '',
        title: ''
      },
      message: ''
    };
  }

  componentDidMount() {
    this.getSpecialist(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    this.setState(prevState => ({
      currentSpecialist: {
      ...prevState.currentSpecialist,
      firstName: e.target.value
    }
    }));
  }

  onChangeLastName(e) {
    this.setState(prevState => ({
      currentSpecialist: {
      ...prevState.currentSpecialist,
      lastName: e.target.value
    }
    }));
  }

  onChangePhone(e) {
    this.setState(prevState => ({
      currentSpecialist: {
      ...prevState.currentSpecialist,
      phone: e.target.value
    }
    }));
  }

  onChangeCountry(e) {
    this.setState(prevState => ({
      currentSpecialist: {
      ...prevState.currentSpecialist,
      country: e.target.value
    }
    }));
  }

  onChangeOccupation(e) {
    this.setState(prevState => ({
      currentSpecialist: {
      ...prevState.currentSpecialist,
      occupation: e.target.value
    }
    }));
  }

  onChangeTitle(e) {
    this.setState(prevState => ({
      currentSpecialist: {
      ...prevState.currentSpecialist,
      title: e.target.value
    }
    }));
  }

  getSpecialist(id) {
    SpecialistDataService.get(id)
      .then(response => {
        this.setState({
          currentSpecialist: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  updateSpecialist() {
    SpecialistDataService.update(
      this.state.currentSpecialist.id,
      this.state.currentSpecialist
    )
      .then(response => {
        console.log(response.data);
        this.setState({message: "Specialist updated successfully!"});
      })
      .catch(err => console.error(err));
  }

  render() {
    const {currentSpecialist} = this.state;

    return (
      <div>
        {currentSpecialist ? (
          <div className="edit-form">
            <h4>First Name</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  required
                  value={currentSpecialist.firstName}
                  onChange={this.onChangeFirstName}
                  name="first-name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last-name"
                  required
                  value={currentSpecialist.lastName}
                  onChange={this.onChangeLastName}
                  name="last-name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  required
                  value={currentSpecialist.phone}
                  onChange={this.onChangePhone}
                  name="phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Country</label>
                <select className="form-control"
                  id="country"
                  name="country"
                  required
                  value={currentSpecialist.country}
                  onChange={this.onChangeCountry}
                >
                  <option
                    selected={currentSpecialist.country === 'USA'}
                    value="USA">
                      United States
                  </option>
                  <option
                    selected={currentSpecialist.country === 'MEX'}
                    value="MEX">
                    Mexico
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="title">Occupation</label>
                <input
                  type="text"
                  className="form-control"
                  id="occupation"
                  required
                  value={currentSpecialist.occupation}
                  onChange={this.onChangeOccupation}
                  name="occupation"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentSpecialist.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
            </form>

            <button
              type="submit"
              className="btn btn-success mr-4"
              onClick={this.updateSpecialist}
            >
              Update
            </button>

            <Link to="/specialists" className="btn btn-light">
              Go Back
            </Link>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Specialist...</p>
          </div>
        )}
      </div>
    );
  }
}
