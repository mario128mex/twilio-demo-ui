import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomerDataService from "../../services/customer.service";

export default class Customer extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);

    this.getCustomer = this.getCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);

    this.state = {
      currentCustomer: {
        id: null,
        firstName: '',
        lastName: '',
        phone: '',
        country: ''
      },
      message: ''
    };
  }

  componentDidMount() {
    this.getCustomer(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        firstName: e.target.value
      }
    }));
  }

  onChangeLastName(e) {
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        lastName: e.target.value
      }
    }));
  }

  onChangePhone(e) {
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        phone: e.target.value
      }
    }));
  }

  onChangeCountry(e) {
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        country: e.target.value
      }
    }));
  }

  getCustomer(id) {
    CustomerDataService.get(id)
      .then(response => {
        this.setState({
          currentCustomer: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  updateCustomer() {
    CustomerDataService.update(
      this.state.currentCustomer.id,
      this.state.currentCustomer
    )
      .then(response => {
        console.log(response.data);
        this.setState({ message: "Customer updated successfully!" });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>{currentCustomer.fullName}</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  required
                  value={currentCustomer.firstName}
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
                  value={currentCustomer.lastName}
                  onChange={this.onChangeLastName}
                  name="last-name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Country</label>
                <select className="form-control"
                  id="country"
                  name="country"
                  required
                  value={currentCustomer.country}
                  onChange={this.onChangeCountry}
                >
                  <option
                    selected={currentCustomer.country === 'USA'}
                    value="USA">
                    United States
                  </option>
                  <option
                    selected={currentCustomer.country === 'MEX'}
                    value="MEX">
                    Mexico
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="title">Phone (10 digits)</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  required
                  value={currentCustomer.phone}
                  onChange={this.onChangePhone}
                  name="phone"
                  maxLength="10"
                />
              </div>
            </form>

            <button
              type="submit"
              className="btn btn-success mr-4"
              onClick={this.updateCustomer}
            >
              Update
            </button>

            <Link to="/customers" className="btn btn-light">
              Go Back
            </Link>

            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
      </div>
    );
  }
}
