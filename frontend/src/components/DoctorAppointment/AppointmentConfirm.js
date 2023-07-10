import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tickimg from "../Home/img/check-mark.png"
function AppointmentConfirm({ data }) {
  const { appointmentId } = useParams();
  const [confirmationData, setconfirmationData] = useState();
  const [docDetails, setdocDetails] = useState();
  useEffect(() => {
    const loadData = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/appointment/get/${appointmentId}`)
        .then((res) => {
          setconfirmationData(res.data.getRecord);
          setdocDetails(res.data.doc);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadData();
  }, []);

  return (
    <>
      {confirmationData ? (
        <>
          {/* <div>
            <p>doctor name:{docDetails.name}</p>
            <p>add other details such as qualification and speciality</p>
          </div>
          <div>
            <p>Appointment time : {confirmationData.time}</p>
            <p>
              Appointment date : {confirmationData.date}-{" "}
              {confirmationData.month}- {confirmationData.year}
            </p>
          </div> */}




<div>
          <div className="test-confirm mt-5">
          <img src={Tickimg} alt=""></img>
          <h1 >Booking Confirmed </h1>
          </div>
          
          <p className="mid-para">We are pleased to inform you that your doctor appointment requrest is received and confirmed</p>
          <br></br>
          
          <div className="last-div shade-des" >
          
            <h3>Appointment Details:</h3>
            <hr style={{width:"400px",marginTop:"0px"}}></hr>
          <span>Doctor Name : {docDetails.name}</span>
          <p><span>Experience: </span>{docDetails.experience}</p>
          <p style={{marginTop:"-16px"}}><span>Qualification: </span>{docDetails.qualification}</p>
          <p style={{marginTop:"-16px"}}> <span>Appointment Date: </span>{confirmationData.date}-{" "}
              {confirmationData.month}- {confirmationData.year}</p>
          <p style={{marginTop:"-16px"}}><span>Appointment Time: </span>{confirmationData.time}</p>
          
          </div>
          {/* fill rest according to the result details */}
        </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default AppointmentConfirm;
