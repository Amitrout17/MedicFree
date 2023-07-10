import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DoctorMsg from "./DoctorMsg";
function DoctorInterface() {
  const { id } = useParams();
  const [logs, setLogs] = useState(null);
  const [text, settext] = useState(null);

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

  return <>
  <h2 style={{ textAlign:"center", padding:".5rem", border:"1rem" }}>Patient Logs</h2>
  <hr />
  <div style={{ height:"2rem", }}></div>
  <div style={{ padding:"0 2.5rem", margin:"0 20%", overflowY:"scroll", border: "2px solid grey", height: "60vh", }}>
  <div style={{ height:".75rem", display:"flex", flexDirection:"column", justifyContent:"center" }}></div>
    {logs && logs.map((item) => <DoctorMsg data={item} />)}
  </div>
  </>;
}

export default DoctorInterface;
