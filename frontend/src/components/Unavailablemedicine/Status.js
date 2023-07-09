import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Status = ({ user }) => {
  const [name, setName] = useState("");
  const [status, setstatus] = useState("");
  const [image, setImage] = useState("");
  // const [hospitals, sethospitals] = useState("");
  const { id } = useParams();

  axios
    .get(`http://localhost:4000/api/unavaibleMedicine/get/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.allRequest[0]);
      setName(res.data.allRequest[0].medicineName);
      setstatus(res.data.allRequest[0].Availabilitystatus);
      setImage(res.data.allRequest[0].image);
    })
    .catch((err) => {
      console.log(err);
    });

  const getStatusColor = status === "pending" ? "orange" : "green";
  return (
    <>
      <h1 className="m-head">Details of your Unavailabe Medicine Booking</h1>
      <div className="div-flex">
        <div className="medical-card">
          <img src={image} alt="" />
          <div className="medicalinp">
            <p>
              Name: <span>{name} </span>
            </p>
            <p>
              Availablibilty Status:{" "}
              <span style={{ color: getStatusColor }}>{status}</span>
            </p>
          </div>
        </div>{" "}
      </div>
      <p className="foot-m">
        We will notify you when the medicine is available
      </p>
    </>
  );
};

export default Status;
