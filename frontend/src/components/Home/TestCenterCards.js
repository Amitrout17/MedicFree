import React from "react";

import "./css/TestCenterCard.css";
import { useNavigate } from "react-router-dom";
function TestCenterCards({ data }) {
  console.log("test center data");
  console.log(data);
  const navigate = useNavigate();
  return (
    <>
      <div className="testcard">
        <img src={data.centerImage} alt="" />
        <div className="cardinput">
          <span>Name: {data.name}</span>
          <p>
            <span>Address: </span>
            {data.address}
          </p>
          <button
            onClick={() => {
              navigate(`/test/testCenters/details/all/${data._id}`);
            }}
          >
            click to view available test
          </button>
        </div>
      </div>
    </>
  );
}

export default TestCenterCards;
