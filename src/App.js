import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import AddSpecialist from "./components/specialists/add-specialist.component";
import SpecialistsList from "./components/specialists/specialists-list.component";
import Specialist from "./components/specialists/specialist.component"

import AddCustomer from "./components/customers/add-customer.component"
import CustomersList from "./components/customers/customers-list.component";
import Customer from "./components/customers/customer.component"

class App extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/specialists" className="navbar-brand">
            Twilio Demo
          </a>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/specialists"} className="nav-link">
                Specialists
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/customers"} className="nav-link">
                Customers
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/specialists"]} component={SpecialistsList} />
            <Route exact path="/add-specialist" component={AddSpecialist} />
            <Route exact path="/specialists/:id" component={Specialist} />

            <Route exact path={["/", "/customers"]} component={CustomersList} />
            <Route exact path="/add-customer" component={AddCustomer} />
            <Route exact path="/customers/:id" component={Customer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
