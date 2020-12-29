import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import App from "./App";
import { render } from "react-dom";
export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      success: "",
      eid: "",
      eidValid: false,
      ename: "",
      enameValid: false,
      esal: "",
      esalValid: false,
      formValid: false,
      formErrors: { eid: "", ename: "", esal: "" },
    };
  }

  handleData = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validate(name, value);
      }
    );
  };

  validate = (name, value) => {
    let l_eidValid = this.state.eidValid;
    let l_formErrors = this.state.formErrors;
    let l_enameValid = this.state.enameValid;
    let l_esalValid = this.state.esalValid;
    switch (name) {
      case "eid":
        l_eidValid = value > 1000;
        l_formErrors.eid = l_eidValid
          ? ""
          : "!! Employee id must be start with 1001 !!";
        break;
      case "ename":
        l_enameValid = value.length > 3;
        l_formErrors.ename = l_enameValid
          ? ""
          : "!! Name must greater than three characters !!";
        break;
      case "esal":
        l_esalValid = parseFloat(value) > 10000;
        l_formErrors.esal = l_esalValid
          ? ""
          : "!! salary must be greater than 10000 !!";
        break;
    }

    this.setState(
      {
        eidValid: l_eidValid,
        enameValid: l_enameValid,
        esalValid: l_esalValid,
        formErrors: l_formErrors,
      },
      this.formValidate
    );
  };
  formValidate = () => {
    this.setState({
      formValid:
        this.state.eidValid && this.state.enameValid && this.state.esalValid,
    });
  };

  Register = () => {
    let obj = {
      eid: this.state.eid,
      ename: this.state.ename,
      esal: this.state.esal,
    };
    Axios.post("http://127.0.0.1:8000/employees/", obj).then(
      (posRes) => {
        this.setState({
          success: "Employee added successfully..",
        });
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  };

  render() {
    return (
      <div className="container " style={{ width: "600px" }}>
        <h1
          style={{
            textShadow: "2px 2px 2px green",
            textAlign: "center",
            color: "red",
          }}
        >
          Register Employee Here
        </h1>

        <br></br>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>
              {" "}
              <h3 style={{ color: "Blue" }}>
                <b>Id</b>
              </h3>
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="number"
              value={this.state.eid}
              name="eid"
              placeholder="Enter IDNO"
              onChange={this.handleData}
              className="form-control"
            ></input>
          </div>
          <div className="col-md-3"></div>
          <div style={{ color: "red" }} className="col-md-9">
            <h5>{this.state.formErrors.eid}</h5>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>
              {" "}
              <h3 style={{ color: "Blue" }}>
                <b>Name</b>
              </h3>
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="ename"
              value={this.state.ename}
              placeholder="Enter the Name"
              onChange={this.handleData}
              className="form-control"
            ></input>
          </div>
          <div className="col-md-3"></div>
          <div style={{ color: "red" }} className="col-md-9">
            <h5>{this.state.formErrors.ename}</h5>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>
              <h3 style={{ color: "Blue" }}>
                <b>Salary</b>
              </h3>
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="number"
              name="esal"
              value={this.state.esal}
              placeholder="Enter the salary"
              onChange={this.handleData}
              className="form-control"
            ></input>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h5 style={{ color: "red" }}>{this.state.formErrors.esal}</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <button
              onClick={this.Register}
              disabled={!this.state.formValid}
              className="btn btn-success btn-sm"
            >
              Register
            </button>
            <br></br>
            <br></br>
          </div>
          <h4 className="text-denger">
            <b>{this.state.success}</b>
          </h4>
        </div>
      </div>
    );
  }
}
