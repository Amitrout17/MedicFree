import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tickimg from "../Home/img/check-mark.png"
import "./testcard.css"

function TestConfirmation() {
  const { id } = useParams();
  const [result, setresult] = useState();
  useEffect(() => {
    const loadData = async (req, res) => {
      await axios
        .get(`http://localhost:4000/api/v1/test/get/testDetails/${id}`)
        .then((res) => {
          console.log(res);
          setresult(res.data.testDetails);
        })
        .catch((err) => {
          console.log(err);
          alert("some error occured");
        });
    };
    loadData();
  }, []);

  return (
    <>
      {result ? (
        <div>
          <div className="test-confirm">
          <img src={Tickimg} alt=""></img>
          <h1 >Booking Confirmed </h1>
          </div>
          
          <p className="mid-para">We are pleased to inform you that your reservation request has been received and confirmed</p>
          <br></br>
          
          <div className="last-div">
          
            <h3>Test Details:</h3>
            <hr style={{width:"400px",marginTop:"0px"}}></hr>
          <span>Test Name : {result.testName}</span>
          <p><span>Test Details: </span>{result.testDetails}</p>
          <p style={{marginTop:"-16px"}}> <span>Test Date: </span>{result.day}-{result.month}-{result.year}</p>
          <p style={{marginTop:"-16px"}}><span>Test Timing: </span>{result.time}</p>
          <p style={{marginTop:"-16px"}}><span>Test Status: </span>{result.resultStatus}</p>
          <p style={{marginTop:"-16px"}}><span>Test Document: </span>{result.resultDocument}</p>
          </div>
          {/* fill rest according to the result details */}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default TestConfirmation;
