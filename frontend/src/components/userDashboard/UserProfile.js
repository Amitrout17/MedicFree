import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Home/css/signlogin.css";

function UserProfile() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      await axios
        .get(
          "http://localhost:4000/api/v1/user/load",
          // 👇️ set withCredentials to `true`
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setname(res.data.UserData.name);
          setemail(res.data.UserData.email);
          setaddress(res.data.UserData.address);
          setage(res.data.UserData.age);
          setpassword(res.data.UserData.password);
          setphone(res.data.UserData.phone);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadUser();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/profileUpdate/${id}`,
        {
          name,
          email,
          address,
          age,
          phone,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Profile Updated!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="dashboardMenu">
        <Sidebar />
        <div className="dashboardMenu-child sidebarContent">
          <div
            className="container-fluid d-none d-sm-block py-4 "
            style={{
              backgroundColor: "rgb(202, 255, 190)",
              textAlign: "center",
            }}
          >
            <li
              className="list-inline list-inline-item"
              style={{ fontSize: "21px" }}
            >
              Update Profile
            </li>
          </div>

          <Container fluid className=" square boarder mx-5">
            <div className="mt-2 ml-2 " style={{ paddingLeft: "230px" }}></div>
            <div className="container px-lg-5 newContainer">
              <Form className="me-4">
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label className="text-start">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label className="text-start">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label className="text-start"> Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Address"
                    name="address"
                    value={address}
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label for="user-age">Enter age</Form.Label>
                  <Form.Control
                    id="user-age"
                    name="age"
                    type="number"
                    aria-label="Date of birth"
                    value={age}
                    onChange={(e) => {
                      setage(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Your Phone no."
                    name="phone"
                    value={phone}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => {
                      setphone(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div style={{ display: "flex" }}>
                    <Form.Control
                      style={{ width: "900px" }}
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setphone(e.target.value);
                      }}
                    />
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </div>
                </Form.Group>

                <div className="">
                  <Button
                    size="lg"
                    className="float-left"
                    variant="primary"
                    type="submit"
                    onClick={submitHandler}
                  >
                    Update
                  </Button>
                </div>
              </Form>
            </div>
          </Container>
          <div className="container-fluid  d-sm-none"></div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
