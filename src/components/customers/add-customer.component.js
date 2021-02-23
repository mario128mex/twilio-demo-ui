import React, { Component } from 'react';
import CustomerDataService from '../../services/customer.service';
import { Link } from "react-router-dom";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);

    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      id: null,
      firstName: '',
      lastName: '',
      phone: '',
      country: '',

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

  saveCustomer() {
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      country: this.state.country
    };

    CustomerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          country: response.data.country,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  newCustomer() {
    this.setState({
      id: null,
      firstName: '',
      lastName: '',
      phone: '',
      country: '',

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
              <button className="btn btn-success" onClick={this.newCustomer}>
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
              </div>

              <button
                onClick={this.saveCustomer}
                className="btn btn-success mr-4"
              >
                Submit
              </button>

                <Link to="/customers" className="btn btn-light">
                  Go Back
                </Link>
            </div>
          )
        }
      </div>
    );
  }
}
