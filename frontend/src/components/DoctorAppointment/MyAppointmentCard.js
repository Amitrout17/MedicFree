import React from "react";
import { useNavigate } from "react-router-dom";

function MyAppointmentCard({ data }) {
  const navigate = useNavigate();
  console.log(data);
  return (
    <>
      <div
        className="medicine-detail3 "
        style={{ textAlign: "center", marginBottom: "10px" }}
      >
        <p>
          <b style={{ fontSize: "20px" }}>Remember to join!</b>
        </p>
        <p className="close">
          Your Appointment is being scheduled same day and exact time.
        </p>
        <p>
          <b>Appointment Date:</b> {data.date}-{data.month}-{data.year}
        </p>
        <p className="close">
          <b>Appointment Time:</b> {data.time}
        </p>
        <p className="close">
          <b>Appointment ID:</b> {data._id}
        </p>
        <div className="btnn2">
          <button
            onClick={() => {
              navigate(`/doctor/vcall/room/${data._id}`);
            }}
          >
            Join Call
          </button>
        </div>
      </div>
    </>
  );
}

export default MyAppointmentCard;
