import React from "react";
import Tick from "../Home/img/tick.png";
import { Link, useParams } from "react-router-dom";
import "./emergencyMedicine.css";

const Conformpage = () => {
  const { id } = useParams();
  return (
    <div className="middle">
      <h1>THANK YOU!</h1>
      <img src={Tick} alt=""></img>
      <p>
       Your Emergency Medicine Request is confirmed.We will reach you out with in a short period of time.
      </p>
      <Link
        to={`/medicine/requrest/emergency/conformbooking/statuspage/${id}`}
        style={{ textDecoration: "none", marginLeft: "-120px" }}
      >
        <button className="btnn">View Status</button>
      </Link>
    </div>
  );
};

export default Conformpage;
