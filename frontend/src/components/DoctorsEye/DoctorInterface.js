import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DoctorMsg from "./DoctorMsg";
function DoctorInterface() {
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

  return <>{logs && logs.map((item) => <DoctorMsg data={item} />)}</>;
}

export default DoctorInterface;
