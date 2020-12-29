import React, { Component } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";
import AddEmp from "./AddEmp";
import Register from "./register";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <br></br>
          <br></br>
          <NavLink
            to="/addEmp"
            activeStyle={{ color: "green" }}
            exact
            strict
            style={{ marginRight: 100 }}
          >
            <button className="btn btn-success btn-sm">View Employees</button>
          </NavLink>
          <NavLink
            to="/register"
            activeStyle={{ color: "green" }}
            exact
            strict
            style={{ marginRight: 100 }}
          >
            <button className="btn btn-primary btn-sm">+ Employee</button>
          </NavLink>
          <br></br>
          <br></br>
          <br></br>
          <Route path="/addEmp" component={AddEmp} exact strict></Route>
          <Route path="/register" component={Register} exact strict></Route>
        </div>
      </BrowserRouter>
    );
  }
}
