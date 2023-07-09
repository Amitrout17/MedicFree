import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Upload from "../Home/img/upload 2.png";
import "./unavailablemedicine.css";

const UnavailableMedicine = ({ user }) => {
  const [files, setFiles] = useState(null);
  const [mname, setMname] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    console.log(files);
    if (mname !== "" && files !== null) {
      e.preventDefault();
      const formData = new FormData();

      formData.append("files", files);
      formData.append("medicineName", mname);
      console.log(formData);
      await axios
        .post("http://localhost:4000/api/unavaibleMedicine/new", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.sucess === true) {
            navigate(
              `/medicine/requrest/unavailabe/conformbooking/${response.data.newRequest._id}`
            );
          } else {
            alert("Enter Valid Credentials");
          }
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.log(e);
        });
    } else {
      alert("Both fields are required!");
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="indiv">
          <h3>Enter your Unavailabe Medicine details</h3>
          <div>
            <form>
              <label
                style={{
                  fontSize: "18px",
                  paddingLeft: "7px",
                  fontWeight: "500",
                }}
                htmlFor="fname"
              >
                Medicine name:{" "}
              </label>
              <br />
              <input
                className="input-tar"
                type="text"
                id="Mname"
                name="mname"
                value={mname}
                onChange={(e) => {
                  setMname(e.target.value);
                }}
              />
              <br />
              <label htmlFor="fileBTN-upload" className="drop-container">
                <img src={Upload} alt="" />
                <span className="drop-title">Drop image here</span>
                <input
                  type="file"
                  id="fileBTN-upload"
                  accept="image/*"
                  onChange={(e) => {
                    e.preventDefault();

                    setFiles(e.target.files[0]);
                  }}
                />
              </label>

              <input
                className="btnn yan"
                type="submit"
                onClick={submitHandler}
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnavailableMedicine;
