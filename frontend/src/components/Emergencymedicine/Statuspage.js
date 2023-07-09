import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Statuspage = () => {
  const [name, setName] = useState("");
  const [status, setstatus] = useState("");
  const [image, setImage] = useState("");
  const [user, updateUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      axios
        .get(`http://localhost:4000/api/emergencyMedicine/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setName(res.data.allRequest[0].medicineName);
          updateUser(res.data.allRequest[0]);
          setstatus(res.data.allRequest[0].Availabilitystatus);
          setImage(res.data.allRequest[0].image);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadData();
  }, []);

  const getStatusColor = status === "pending" ? "orange" : "green";
  return (
    <>
      <h1 className="m-head">Status of Emergency Medicine Booking</h1>
      <div className="div-flex" style={{ gap: "10%" }}>
        <div
          className="medical-card"
          style={{ width: "23%", paddingLeft: "20px", fontWeight: "500" }}
        >
          <h2>User Details: </h2>
          <p>Name : {user.patientName}</p>
          <p>Address : {user.address}</p>
          <p>Time : {user.time}</p>
          <p>Date : {user.date}</p>
        </div>
        <div className="medical-card">
          <img src={image} alt="" />
          <div className="medicalinp">
            <p>
              Medicine Name: <span>{name} </span>
            </p>
            <p>
              Availablibilty Status:{" "}
              <span style={{ color: getStatusColor }}>{status}</span>
            </p>
          </div>
        </div>{" "}
      </div>
      <p className="foot-m">We will notify you soon about availibility</p>
    </>
  );
};

export default Statuspage;
