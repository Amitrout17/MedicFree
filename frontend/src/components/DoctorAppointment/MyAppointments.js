import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyAppointmentCard from "./MyAppointmentCard";

function MyAppointments() {
  const id = localStorage.getItem("userId");
  const [appointment, setappointment] = useState();
  useEffect(() => {
    const loadData = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/appointment/all/my/${id}`)
        .then((res) => {
          console.log(res);
          setappointment(res.data.allAppointment);
        });
    };
    loadData();
  }, []);

  return (
    <>
      <div>
        <h2 className="head-medicineTaken py-3 mb-3">My Appointments</h2>
          <div className="appointment">
          {appointment &&
          appointment.map((item) => <MyAppointmentCard data={item} />)}
          </div>
        
      </div>
    </>
  );
}

export default MyAppointments;
