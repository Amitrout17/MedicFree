import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LogTemplate from "./LogTemplate";

function DoctorsEyeUser() {
  const { id } = useParams();
  const [logs, setLogs] = useState(null);

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
    <div style={{ display:"flex", flexDirection:"column", gap:"20px", padding:"2rem"}}>
        {logs ?
        logs.map((item) => LogTemplate(item))
        :
        <div>Fetching json data...</div>}
      </div>
    </>
  );
}

export default DoctorsEyeUser;
