import React from "react";
import "./css/medicinecard.css";
import { Link } from "react-router-dom";
function MedicineCard({ data }) {
  console.log(data);
  return (
    <div className="medicinecard">
      <img src={data.image} alt="" />{" "}
      <div className="medicine-detail">
        <span>Name: {data.name}</span>
        <p>
          <span style={{ fontSize: "16px" }}>Category: </span>
          {data.category}
        </p>
        <p style={{ marginTop: "-9px" }}>
          <span style={{ fontSize: "16px" }}>Stock: </span>
          {data.stock}
        </p>
        <Link to={`/medicine/book/${data.medicineId}/${data.store_id}`}>
          <button>Get The Medicine</button>
          </Link>
      </div>
    </div>
  );
}

export default MedicineCard;
