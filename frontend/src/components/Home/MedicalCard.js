import React from "react";
import './css/medicalcard.css'
function MedicalCard({ data }) {
  return (
    <>
      <div className="medical-card">
        <img src={data.image} alt="" 
        />
        <div className="medicalinput">
        <span>Name: {data.medicalName}</span>
        <p><span>Addresss: </span>{data.address}</p>
        <h6>No of hospital beds available: {data.beds}</h6>
        <button>click to see details</button>
      </div></div>
    </>
  );
}

export default MedicalCard;
