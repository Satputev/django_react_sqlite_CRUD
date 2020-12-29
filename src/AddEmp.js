import React, { Component } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Update from "./update";
import { BrowserRouter, NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";
export default class AddEmp extends React.Component {
  constructor() {
    super();
    this.state = {
      res: [],
      posRes: "",
      eid: "",
      ename: "",
      esal: "",
    };
  }
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/employees/").then(
      (posRes) => {
        this.setState({
          res: posRes.data,
        });
      },
      (errRes) => {}
    );
  }

  DeleteEmp = (id) => {
    console.log(id);
    axios.delete("http://127.0.0.1:8000/employees/" + id + "/").then(
      (posRes) => {
        console.log(posRes);
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  };
  updateEmp = (obj) => {
    this.setState(
      {
        eid: obj.eid,
        ename: obj.ename,
        esal: obj.esal,
      },
      this.send
    );
  };

  send = () => {
    return (
      <Update
        key1={this.state.eid}
        key2={this.state.ename}
        key3={this.state.esal}
      />
    );
  };

  render() {
    return (
      <div className="container">
        <br></br>
        <br></br>
        <table className="table table-stripped table-hover table-bordered">
          <thead className="bg-warning text-danger">
            <tr>
              <th>SRNO</th>
              <th>Name</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody className=" text-primary">
            {this.state.res.map((element, index) => (
              <tr>
                <th>{element.eid}</th>
                <th>{element.ename}</th>
                <th>{element.esal}</th>
                <th>
                  <BrowserRouter>
                    <div>
                      <NavLink to="/update" exact strict>
                        <button
                          onClick={() => {
                            this.updateEmp({
                              eid: element.eid,
                              ename: element.ename,
                              esal: element.esal,
                            });
                          }}
                          className="ml-2 btn btn-info btn-sm "
                        >
                          Update
                        </button>
                      </NavLink>
                      <NavLink to=" " exact strict>
                        <button
                          onClick={() => {
                            if (window.confirm("Do you want to delete ?")) {
                              this.DeleteEmp(element.eid);
                            }
                          }}
                          className="ml-4 btn btn-danger btn-sm "
                        >
                          Delete
                        </button>
                      </NavLink>
                      <Route
                        path="/update"
                        component={Update}
                        exact
                        strict
                      ></Route>
                    </div>
                  </BrowserRouter>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
