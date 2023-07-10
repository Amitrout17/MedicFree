import React from "react";
import { useNavigate } from "react-router-dom";

function MyAppointmentCard({ data }) {
  const navigate = useNavigate();
  return (
    <>
      <div>
        add a message here that your appointment is bing scheduled at following
        date and time, pls join the call on the same time appointment date :{" "}
        {data.date}-{data.month}-{data.year}
        appointment time: {data.time}
        <button
          onClick={() => {
            navigate(`/doctor/vcall/room/${data._id}`);
          }}
        >
          join call
        </button>
      </div>
    </>
  );
}

export default MyAppointmentCard;
