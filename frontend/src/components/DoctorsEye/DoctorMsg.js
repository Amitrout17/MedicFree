import React from "react";

function DoctorMsg({ data }) {
  console.log(data);
  const cardStyle = {
    backgroundColor: '#f2f2f2',
    border: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    padding: '0 .75rem'
  };
  return (
    <>
      <div style={ cardStyle }>
        <p><b>Patient Msg :</b> {data.message}</p>
        <p><b>AI Summary :</b> {data.aiConclusion}</p>
        <p style={{ fontWeight:"500", marginLeft:"40rem" }}>
          {data.time} {data.date}
        </p>
      </div>
    </>
  );
}

export default DoctorMsg;
