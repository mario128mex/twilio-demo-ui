import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import AppointmentDataService from '../../services/appointment.service';
import CustomerDataService from "../../services/customer.service";
import SpecialistDataService from "../../services/specialist.service";

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.onChangeCustomerId = this.onChangeCustomerId.bind(this);
    this.onChangeSpecialistId = this.onChangeSpecialistId.bind(this);
    this.onChangeDateTime = this.onChangeDateTime.bind(this);

    this.saveAppointment = this.saveAppointment.bind(this);
    this.newAppointment = this.newAppointment.bind(this);

    this.state = {
      id: null,
      customerId: '',
      specialistId: '',
      dateTime: '',

      customers: [],
      specialists: [],
      submitted: false
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
    this.retrieveSpecialists();
  }

  retrieveCustomers() {
    CustomerDataService.getAll()
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  retrieveSpecialists() {
    SpecialistDataService.getAll()
      .then(response => {
        this.setState({
          specialists: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  onChangeCustomerId(e) {
    console.log('this is my customer id');
    console.log(e.target.value);
    this.setState({
      customerId: e.target.value
    });
  }

  onChangeSpecialistId(e) {
    this.setState({
      specialistId: e.target.value
    });
  }

  onChangeDateTime(date) {
    this.setState({
      dateTime: date
    });
  }

  saveAppointment() {
    const data = {
      customerId: this.state.customerId,
      specialistId: this.state.specialistId,
      dateTime: this.state.dateTime
    };

    AppointmentDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          customerId: response.data.customerId,
          specialistId: response.data.specialistId,
          dateTime: response.data.dateTime,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  newAppointment() {
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
    const {customers, specialists, customerId, specialistId, dateTime} = this.state;
    return (
      <div className="submit-form">
        {
          this.state.submitted ? (
            <div>
              <h4>Appointment created successfully</h4>
              <Link className="btn btn-success" to="/appointments">
                Go back
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Customer</label>
                <select className="form-control"
                  id="customerId"
                  name="customerId"
                  required
                  value={this.state.customerId}
                  onChange={this.onChangeCustomerId}
                >
                  <option selected value={null}>Please select</option>
                  {customers.map((customer, index) => {
                    return <option
                      key={customer.id}
                      value={customer.id}
                      selected={customerId === customer.id}
                    >
                      {customer.fullName}
                    </option>
                  })}
                </select>

                <label htmlFor="title">Specialist</label>
                <select className="form-control"
                  id="specialistId"
                  name="specialistId"
                  required
                  value={this.state.specialistId}
                  onChange={this.onChangeSpecialistId}
                >
                  <option selected value={null}>Please select</option>
                  {specialists.map((specialist, index) => {
                    return <option
                      key={specialist.id}
                      value={specialist.id}
                      selected={specialistId === specialist.id}
                    >
                      {specialist.fullName}
                    </option>
                  })}
                </select>

                <label htmlFor="title">Date</label>
                <br />
                <DatePicker
                  className="form-control"
                  selected={dateTime}
                  onChange={this.onChangeDateTime}
                />
              </div>

              <button
                onClick={this.saveAppointment}
                className="btn btn-success mr-4"
              >
                Submit
              </button>

                <Link to="/appointments" className="btn btn-light">
                  Go Back
                </Link>
            </div>
          )
        }
      </div>
    );
  }
}
