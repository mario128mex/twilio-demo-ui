import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";

import AppointmentDataService from "../../services/appointment.service";
import CustomerDataService from "../../services/customer.service";
import SpecialistDataService from "../../services/specialist.service";

const DATE_FORMAT = 'dddd DD/MM/YY hh:mm A';

export default class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveAppointments = this.retrieveAppointments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAppointment = this.setActiveAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      appointments: [],
      customers: [],
      specialists: [],
      currentAppointment: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveAppointments();
    this.retrieveCustomers();
    this.retrieveSpecialists();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({ searchName });
  }

  retrieveAppointments() {
    AppointmentDataService.getAll()
      .then(response => {
        this.setState({
          appointments: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
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

  refreshList() {
    this.retrieveAppointments();
    this.setState({
      currentAppointment: null,
      currentIndex: -1
    });
  }

  setActiveAppointment(appointment, index) {
    this.setState({
      currentAppointment: appointment,
      currentIndex: index
    });
  }

  deleteAppointment(id) {
    AppointmentDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(err => console.error(err));
  }

  searchName() {
    if (!this.state.searchName) {
      this.retrieveAppointments();
      return;
    }

    AppointmentDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          appointments: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    const { searchName, appointments, currentAppointment, currentIndex } = this.state;

    return (
      <div className="list row">
        
        <div className="col-md-6">
          <h4>Appointments List</h4>

          <ul className="list-group">
            {appointments  && appointments.map((appointment, index) => {
              return <li
                className={
                  `list-group-item ${index === currentIndex ? 'active' : ''}`
                }
                onClick={() => this.setActiveAppointment(appointment, index)}
                key={index}
              >
                {`${appointment.customer.fullName} - ${appointment.specialist.fullName}`} <br/>
                {`on ${Moment(appointment.dateTime).format(DATE_FORMAT)}`}
              </li>
            })}
          </ul>

          <Link
            className="m-3 btn btn-success"
            to="/add-appointment"
          >
            Create
          </Link>
        </div>

        <div className="col-md-6">
          {currentAppointment ? (
            <div>
              <h4>Appointment</h4>
              <div>
                <label>
                  <strong>Customer:</strong>
                </label>{" "}
                {currentAppointment.customer.fullName}
              </div>
              <div>
                <label>
                  <strong>Customer phone:</strong>
                </label>{" "}
                {currentAppointment.customer.phone}
              </div>
              <div>
                <label>
                  <strong>Specialist:</strong>
                </label>{" "}
                {currentAppointment.specialist.fullName}
              </div>
              <div>
                <label>
                  <strong>Specialist phone:</strong>
                </label>{" "}
                {currentAppointment.specialist.phone}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                <span
                  className={
                    `badge
                    ${currentAppointment.status === 'accepted' ? 'badge-success' : ''}
                    ${currentAppointment.status === 'pending' ? 'badge-warning' : ''}
                    ${currentAppointment.status === 'canceled' ? 'badge-danger' : ''}
                    ${currentAppointment.status === 'rejected' ? 'badge-danger' : ''}
                    ml-3`
                  }
                >
                  {currentAppointment.status}
                </span>
              </div>
              <div>
                <label>
                  <strong>Date and time:</strong>
                </label>{" "}
                {Moment(currentAppointment.dateTime).format(DATE_FORMAT)}
              </div>

              <button
                className="btn badge badge-danger"
                onClick={() => this.deleteAppointment(currentAppointment.id)}
              >
                Delete
              </button>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Appointment...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
