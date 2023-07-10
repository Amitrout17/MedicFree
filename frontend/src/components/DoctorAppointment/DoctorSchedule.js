import axios from "axios";
import React, { useEffect, useState } from "react";
import MyAppointmentCard from "./MyAppointmentCard";

function DoctorSchedule() {
  const id = localStorage.getItem("userId");
  const [appointment, setappointment] = useState();
  const [docId, setdocId] = useState();

  const loadData = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/appointment/all/my/doc/${docId}`)
      .then((res) => {
        console.log(res);
        setappointment(res.data.allAppointment);
      });
  };

  return (
    <>
      <div>
        <h2 className="head-medicineTaken py-3 mb-3">
          Search For Appointments
        </h2>
        <div
          style={{
            marginLeft: "30%",
          }}
        >
          <input
            type="text"
            placeholder="Enter Your Id"
            onChange={(e) => {
              setdocId(e.target.value);
            }}
            className="app-search"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "8px",
              fontSize: "16px",
            }}
          />

          <button
            onClick={loadData}
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Search For Appointments
          </button>
        </div>
        <div className="appointment">
          {appointment &&
            appointment.map((item) => <MyAppointmentCard data={item} />)}
        </div>
      </div>
    </>
  );
}

export default DoctorSchedule;
