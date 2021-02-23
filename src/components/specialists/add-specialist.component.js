import React, { Component } from 'react';
import SpecialistDataService from '../../services/specialist.service';
import { Link } from "react-router-dom";

export default class AddSpecialist extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeOccupation = this.onChangeOccupation.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.saveSpecialist = this.saveSpecialist.bind(this);
    this.newSpecialist = this.newSpecialist.bind(this);

    this.state = {
      id: null,
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
      occupation: '',
      title: '',

      submitted: false
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value
    });
  }

  onChangeOccupation(e) {
    this.setState({
      occupation: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  saveSpecialist() {
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      country: this.state.country,
      occupation: this.state.occupation,
      title: this.state.title
    };

    SpecialistDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          country: response.data.country,
          occupation: response.data.occupation,
          title: response.data.title,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  newSpecialist() {
    this.setState({
      id: null,
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
      occupation: '',
      title: '',

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {
          this.state.submitted ? (
            <div>
              <h4>You submitted successfully</h4>
              <button className="btn btn-success" onClick={this.newSpecialist}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  required
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName}
                  name="first-name"
                />

                <label htmlFor="title">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last-name"
                  required
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                  name="last-name"
                />

                <label htmlFor="title">Country</label>
                <select className="form-control"
                  id="country"
                  name="country"
                  required
                  value={this.state.country}
                  onChange={this.onChangeCountry}
                >
                  <option selected value={null}>Please select</option>
                  <option value="USA">United States</option>
                  <option value="MEX">Mexico</option>
                </select>

                <label htmlFor="title">Phone (10 digits)</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  required
                  value={this.state.phone}
                  onChange={this.onChangePhone}
                  name="phone"
                  maxLength="10"
                />

                <label htmlFor="title">Occupation</label>
                <input
                  type="text"
                  className="form-control"
                  id="occupation"
                  required
                  value={this.state.occupation}
                  onChange={this.onChangeOccupation}
                  name="occupation"
                />

                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>

              <button
                onClick={this.saveSpecialist}
                className="btn btn-success mr-4"
              >
                Submit
              </button>

                <Link to="/specialists" className="btn btn-light">
                  Go Back
                </Link>
            </div>
          )
        }
      </div>
    );
  }
}
