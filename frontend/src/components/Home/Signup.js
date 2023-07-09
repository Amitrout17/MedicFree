import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import "./css/signlogin.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    document: "",
    phone: "",
    age: "",
  });
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, address, password, document, phone, age } =
      credentials;
    const response = await fetch("http://localhost:4000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address,
        password,
        document,
        phone,
        age,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.sucess) {
      //save the auth toke to local storage and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/login");
    } else {
      console.log("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        className="container-fluid d-none d-sm-block py-4 mt-2"
        style={{ backgroundColor: "#e1f0c7", textAlign: "center" }}
      >
        <h1>Create an account</h1>
        <li className="list-inline list-inline-item list-style">
          <a href="/" style={{ textDecoration: "none" }}>
            <span>Home</span>
          </a>
          <span>{" >>"} </span>
        </li>
        <li className="list-inline list-inline-item">create an account</li>
      </div>

      <Container fluid className=" square boarder mx-5 ">
        <div className="mt-2 ml-2 " style={{ paddingLeft: "230px" }}>
          <span>Already have an account?? </span>
          <a href="/login" style={{ textDecoration: "none" }}>
            {" "}
            login instead
          </a>{" "}
        </div>
        <div className="container px-lg-5 newContainer">
          <Form className="me-4">
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label className="text-start">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </Form.Group>
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
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label className="text-start"> Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Address"
                name="address"
                value={credentials.address}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label className="text-start">Document</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter email"
                name="document"
                value={credentials.document}
                onChange={onChange}
              />

              <Form.Text className="text-muted">
                We'll never share your document with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label for="user-age">Enter age</Form.Label>
              <Form.Control
                id="user-age"
                name="age"
                type="number"
                aria-label="Date of birth"
                value={credentials.age}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Your Phone no."
                name="phone"
                value={credentials.phone}
                onWheel={(e) => e.target.blur()}
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

            <div className="">
              <Button
                size="lg"
                className="float-left"
                variant="primary"
                type="submit"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
      <div className="container-fluid  d-sm-none"></div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Signup;
