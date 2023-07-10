import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          <div>
            <p>doctor name:{docDetails.name}</p>
            <p>add other details such as qualification and speciality</p>
          </div>
          <div>
            <p>Appointment time : {confirmationData.time}</p>
            <p>
              Appointment date : {confirmationData.date}-{" "}
              {confirmationData.month}- {confirmationData.year}
            </p>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default AppointmentConfirm;
