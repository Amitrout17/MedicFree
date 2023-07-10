import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Upload from "../Home/img/upload 2.png";
import AdminSidebar from "./AdminSidebar";

const AdminUpload = ({ user }) => {
  const [files, setFiles] = useState(null);
  const {id}=useParams();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    console.log(files);
    if ( files !== null) {
      e.preventDefault();
      const formData = new FormData();

      formData.append("files", files);
      formData.append("id", id);
      console.log(formData);
      await axios
        .post("http://localhost:4000/api/v1/admin/publishtestresults", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
            navigate(
              `/dashboard/admin/labtest/${id}`
            );
          
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.log(e);
        });
    } else {
      alert(" field is required!");
    }
  };

  return (
    <div>
         <div className="dashboardMenu">
        <AdminSidebar />
        <div className="sidebarContent dashboardMenu-child">
      <div className="wrapper">
        <div className="indiv">
          <h3>Enter your Unavailabe Medicine details</h3>
          <div>
            <form>
              
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
    </div>
    </div>
  );
};

export default AdminUpload;
