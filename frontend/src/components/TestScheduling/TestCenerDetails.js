import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TestCards from "./TestCards";

function TestCenerDetails() {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const loadData = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/test/get/availableTest/${id}`)
        .then((res) => {
          setData(res.data.test);
          console.log(res.data.test);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadData();
  }, []);

  return <>
  <div className="testmap" style={{margin:"20px 20px"}}>
  {data && data.map((item) => <TestCards data={item} id={id} />)}
  </div>
  </>;
}

export default TestCenerDetails;
