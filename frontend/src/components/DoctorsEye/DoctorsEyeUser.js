import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LogTemplate from "./LogTemplate";
import "./doctorEye.css";
import { Oval } from "react-loader-spinner";

function DoctorsEyeUser() {
  const { id } = useParams();
  const [logs, setLogs] = useState(null);
  const [message, setmessage] = useState("");
  const [wait, setwait] = useState(false);

  const updatelog = async () => {
    setwait(true);
    await axios
      .post(`http://localhost:4000/api/v1/doctoreye/update/${id}`, {
        message,
      })
      .then((res) => {
        setwait(false);
        window.location.reload();
      })
      .catch((err) => {
        setwait(false);
        alert("some error occured");
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchLogs = async () => {
      await axios
        .post(`http://localhost:4000/api/v1/doctoreye/get/${id}`)
        .then((res) => {
          setLogs(res.data.logs);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchLogs();
  }, []);

  return (
    <>
      {wait ? (
        <div style={{ height: "60vh", display: "flex" }}>
          <div
            style={{
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        </div>
      ) : (
        <div className="doctorEyeMainDiv">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
              border: "1px solid black",
              marginTop: "20px",
              height: "400px",
              overflow: "scroll",
            }}
          >
            <h5>My daily Logs</h5>
            <hr />
            {logs ? (
              logs.reverse().map((item) => LogTemplate(item))
            ) : (
              <div>Fetching json data...</div>
            )}
          </div>
          <div class="doctorEyeMsg">
            <input
              type="text"
              name=""
              id=""
              placeholder="update your log..."
              onChange={(e) => {
                setmessage(e.target.value);
              }}
            />
            <button onClick={updatelog}>Update</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorsEyeUser;
