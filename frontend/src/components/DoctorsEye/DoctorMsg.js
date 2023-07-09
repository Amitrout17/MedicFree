import React from "react";

function DoctorMsg({ data }) {
  console.log(data);
  return (
    <>
      <div>
        <p>Patient Msg : {data.message}</p>
        <p>AI Summary : {data.aiConclusion}</p>
        <p>
          {data.time} {data.date}
        </p>
      </div>
    </>
  );
}

export default DoctorMsg;
