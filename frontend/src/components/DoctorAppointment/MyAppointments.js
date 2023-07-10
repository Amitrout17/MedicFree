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
        <h5>My Appointments</h5>

        {appointment &&
          appointment.map((item) => <MyAppointmentCard data={item} />)}
      </div>
    </>
  );
}

export default MyAppointments;
