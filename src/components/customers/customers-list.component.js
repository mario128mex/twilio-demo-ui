import React, { Component } from "react";
import CustomerDataService from "../../services/customer.service";
import { Link } from "react-router-dom";

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({ searchName });
  }

  retrieveCustomers() {
    CustomerDataService.getAll()
      .then(response => {
        console.log(response);
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
      currentIndex: index
    });
  }

  deleteCustomer(id) {
    CustomerDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(err => console.error(err));
  }

  searchName() {
    if (!this.state.searchName) {
      this.retrieveCustomers();
      return;
    }

    CustomerDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    const { searchName, customers, currentCustomer, currentIndex } = this.state;

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
          <h4>Customers List</h4>

          <ul className="list-group">
            {customers  && customers.map((customer, index) => {
              return <li
                className={
                  `list-group-item ${index === currentIndex ? 'active' : ''}`
                }
                onClick={() => this.setActiveCustomer(customer, index)}
                key={index}
              >
                {customer.fullName}
              </li>
            })}
          </ul>

          <Link
            className="m-3 btn btn-success"
            to="/add-customer"
          >
            Create
          </Link>
        </div>

        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>First Name:</strong>
                </label>{" "}
                {currentCustomer.firstName}
              </div>
              <div>
                <label>
                  <strong>Last Name:</strong>
                </label>{" "}
                {currentCustomer.lastName}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentCustomer.phone}
              </div>
              <div>
                <label>
                  <strong>Country:</strong>
                </label>{" "}
                {currentCustomer.country}
              </div>

              <Link
                to={"/customers/" + currentCustomer.id}
                className="badge badge-warning mr-3"
              >
                Edit
              </Link>

              <button
                className="btn badge badge-danger"
                onClick={() => this.deleteCustomer(currentCustomer.id)}
              >
                Delete
              </button>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Customer...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
