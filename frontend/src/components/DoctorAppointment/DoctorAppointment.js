import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./doctor.css";
import Heart from "./images/heart.png";
import Arrow from "./images/icons8-arrow-50.png";
import Cancer from "./images/icons8-reminder-96.png";
import Dia from "./images/diabetes.png";
import Hyper from "./images/icons8-hypertension-96.png";

const DoctorAppointment = () => {
  const navigate = useNavigate();
  // const handleinput= (spaciality)=>{
  //   Navigate(`/doctor/find/${spaciality}`);
  // }
  const myappointment = async () => {
    navigate("/doctor/appointment/my");
  };
  return (
    <>
      <div className="doctor-item">
        <div className="one-item">
          <Link
            to={"/doctor/find/Cardiology"}
            style={{ textDecoration: "none" }}
          >
            <div className="doctor-detail">
              <img src={Heart} className="fir-img" alt=""></img>
              <div className="inner-detail">
                <b>Cardiology</b>
                <p>For Heart and Blood pressure problem</p>
              </div>
              <img src={Arrow} className="last-img" alt=""></img>
            </div>
            <hr style={{ width: "450px" }} />
            <b className="last-para">
              Chest pain, Heart Failure and cholestrol{" "}
            </b>
          </Link>
        </div>
        <div className="one-item">
          <Link to={"/doctor/find/Cancer"} style={{ textDecoration: "none" }}>
            <div className="doctor-detail">
              <img src={Cancer} className="fir-img" alt=""></img>
              <div className="inner-detail">
                <b>Cancer</b>
                <p>Breast cancer,Prostate cancer,Lung cancer</p>
              </div>
              <img src={Arrow} className="last-img" alt=""></img>
            </div>
            <hr style={{ width: "450px" }} />
            <b className="last-para">
              Treatment of side effect of cancer as pain,fatigue,hair loss
            </b>
          </Link>
        </div>
        <div className="one-item">
          <Link to={"/doctor/find/Diabetes"} style={{ textDecoration: "none" }}>
            <div className="doctor-detail">
              <img src={Dia} className="fir-img" alt=""></img>
              <div className="inner-detail">
                <b>Diabetes</b>
                <p>Stroke ,Heart attack and Kidney failure</p>
              </div>
              <img src={Arrow} className="last-img" alt=""></img>
            </div>
            <hr style={{ width: "450px" }} />
            <b className="last-para">Regular check up and Blood Sugar Level</b>
          </Link>
        </div>
        <div className="one-item">
          <Link
            to={"/doctor/find/HyperTension"}
            style={{ textDecoration: "none" }}
          >
            <div className="doctor-detail">
              <img src={Hyper} className="fir-img" alt=""></img>
              <div className="inner-detail">
                <b>Hyper Tension</b>
                <p>For high cholesterol and hormone problem</p>
              </div>
              <img src={Arrow} className="last-img" alt=""></img>
            </div>
            <hr style={{ width: "450px" }} />
            <b className="last-para">
              consultancy for healthy diet and healthy body weight
            </b>
          </Link>
        </div>
      </div>
      <div className="btnn2">
      <button onClick={myappointment} >My Appointments</button>
      </div>
      
    </>
  );
};

export default DoctorAppointment;
