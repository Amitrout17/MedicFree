import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { Oval } from "react-loader-spinner";

function AddMedicine() {
  const [jsonData, setJsonData] = useState(null);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [storeName, setstoreName] = useState("");
  const [medicinename, setmedicinename] = useState("");
  const [address, setaddress] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [stock, setstock] = useState("");
  const [category, setcategory] = useState("");
  const [medicineimage, setmedicineimage] = useState("");
  const [storeimage, setstoreimage] = useState("");

  const submitHandler = async(e) => {
    e.preventDefault();
    await axios.post(
        `http://localhost:4000/api/v1/medicine/add`,
        {
            storeName,
            'medicine': [
                {
                name: medicinename,
                stock,
                category,
                medicineimage,
                }
            ],
            address,
            pinCode,
            stock,
            storeimage
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )
    .then((res) => {
        console.log(res);
        setJsonData(res);
    if(res.data.success === true) {
        alert("Medicine Added");
        window.location.reload();
    } else {
        alert("Internal Server Error");
    }})
    .catch((err) => {
        console.log(err);
    });
    
}

  return (
      <>
        <div className="dashboardMenu">
          <AdminSidebar />
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
                Add New Medicine
              </li>
            </div>
  
            <Container fluid className=" square boarder mx-5">
              <div className="mt-2 ml-2 " style={{ paddingLeft: "230px" }}></div>
              <div className="container px-lg-5 newContainer">
                <Form className="me-4">
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="text-start">Enter Medicine Name: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Medicine Name here "
                      name="name"
                      value={medicinename}
                      onChange={(e) => {
                        setmedicinename(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="text-start">Enter Medicine Category: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Category here "
                      name="name"
                      value={category}
                      onChange={(e) => {
                        setcategory(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="text-start">Upload Medicine Image: </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      placeholder="Enter Medicine Image here "
                      name="name"
                      value={medicineimage}
                      onChange={(e) => {
                        setmedicineimage(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="text-start">Enter Medicine Stock: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Medicine Stock here"
                      name="name"
                      value={stock}
                      onChange={(e) => {
                        setstock(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="text-start">Enter Store Name: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Store Name here"
                      name="email"
                      value={storeName}
                      onChange={(e) => {
                        setstoreName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="text-start"> Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address of Store here"
                      name="address"
                      value={address}
                      onChange={(e) => {
                        setaddress(e.target.value);
                      }}
                    />
                  </Form.Group>
  
                  <Form.Group>
                    <Form.Label for="pinCode">Enter Pin Code: </Form.Label>
                    <Form.Control
                      id="pinCode"
                      name="age"
                      type="number"
                      placeholder="Enter Pin Code here"
                      value={pinCode}
                      onChange={(e) => {
                        setpinCode(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label className="text-start">Upload Store Image: </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      placeholder="Enter Store Image here "
                      name="name"
                      value={storeimage}
                      onChange={(e) => {
                        setstoreimage(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <div className="">
                    <Button
                      size="lg"
                      className="float-left mt-3"
                      variant="primary"
                      type="submit"
                      onClick={e => submitHandler(e)}
                    >
                      Add Medicine
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

export default AddMedicine;
