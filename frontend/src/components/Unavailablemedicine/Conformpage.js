import React from "react";
import Tick from "../Home/img/tick.png";
import { Link, useParams } from "react-router-dom";
import "./unavailablemedicine.css";

const Conformpage = () => {
  const { id } = useParams();
  return (
    <div className="middle">
      <h1>THANK YOU!</h1>
      <img src={Tick} alt=""></img>
      <p>
        Your medicine booking is confirmed. When it is available, we will reach
        you out through mail.
      </p>
      <Link
        to={`/medicine/requrest/unavailabe/conformbooking/status/${id}`}
        style={{ textDecoration: "none", marginLeft: "-120px" }}
      >
        <button className="btnn">View Status</button>
      </Link>
    </div>
  );
};

export default Conformpage;
