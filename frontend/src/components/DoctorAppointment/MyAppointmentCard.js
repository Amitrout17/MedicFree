import React from "react";
import { useNavigate } from "react-router-dom";

function MyAppointmentCard({ data }) {
  const navigate = useNavigate();
  console.log(data.result)
  return (
    <>
      <div className="medicine-detail3 " style={{textAlign:"center",marginBottom:"10px"}}>
       
       <p ><b style={{fontSize:"20px"}} >Remember to join!</b></p>
       <p className="close">Your Appointment is being scheduled same day and exact time.</p>
       <p className="close"><b>Appointment Id:</b> {data.i._id}</p> 
       <p className="close"><b>Doctor name:</b> {data.doctorname}</p> 
        <p><b>Appointment Date:</b>{" "}
        {data.i.date}-{data.i.month}-{data.i.year}</p>
        <p className="close"><b>Appointment Time:</b>  {data.i.time}</p>
        <div className="btnn2">
        <button 
          onClick={() => {
            navigate(`/doctor/vcall/room/${data.i._id}`);
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
