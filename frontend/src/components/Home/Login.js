import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import "./css/signlogin.css";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  /*   axios.post("http://localhost:5001/login", loginBody, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
 */
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.sucess === true) {
        navigate("/");
      }
    } catch (error) {
      alert("Enter Valid Credentials");
    }

  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div
        className="container-fluid d-none d-sm-block py-4 mt-2"
        style={{ backgroundColor: "#e1f0c7", textAlign: "center" }}
      >
        <h1>Log In To Your Account</h1>
        <li className="list-inline list-inline-item list-style">
          <a href="/" style={{ textDecoration: "none" }}>
            <span>Home</span>
          </a>
          <span> {" >>"} </span>
        </li>
        <li className="list-inline list-inline-item">log in to your account</li>
      </div>

      <Container fluid className="mt-2">
        <div className="mt-2 ml-2" style={{ paddingLeft: "230px" }}>
          <span>No Account??</span>
          <a href="/signup" style={{ textDecoration: "none" }}>
            Create One Here
          </a>{" "}
        </div>
        <div className="container px-lg-5 newContainer">
          <Form className="me-4">
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label className="text-start">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </Form.Group>
            <div>
              <a href="/" style={{ textDecoration: "none" }} className="mt-5">
                Forgot password
              </a>
            </div>
            <Button
              size="lg"
              className="float-left mt-3 ml-3"
              variant="primary"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Container>
      <div className="container-fluid  d-sm-none"></div>

      <Footer />
    </div>
  );
};

export default Login;
