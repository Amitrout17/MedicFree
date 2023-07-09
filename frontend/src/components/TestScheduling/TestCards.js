import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function TestCards({ data, id }) {
  const navigate = useNavigate();
  const registerData = async () => {
    axios
      .post(
        `http://localhost:4000/api/v1/test/newTest/${id}/${data._id}`,
        {
          testName: data.testName,
          testDetails: data.details,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        //confirmation test schdeling to be redirected from here
        navigate(`/test/confirmation/${res.data.newRecord._id}`);
      })
      .catch((err) => {
        console.log(err);
        alert("some error occured try again");
      });
  };
  return (
    <>
    <div className="medical-card">
      <img src={data.image} alt="" />
      <div className="medicalinput">
      <span>Test Name: {data.testName}</span>
      <p><span>Details:</span> {data.details}</p>
      <button onClick={registerData}>schedule this test</button>
      </div></div>
    </>
  );
}

export default TestCards;
