import React,{useState,useEffect} from 'react'
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import './Dashboard.css';
import axios from 'axios';
import { Oval } from "react-loader-spinner";
const LabTestDetails = () => {


  const [jsonData, setJsonData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/dashboard/labTest/${id}`, {
          withCredentials: true,
        });
        setJsonData(response.data);
				console.log(response);
      } catch (error) {
        console.log('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="dashboardMenu">
      <Sidebar />
      <div className="sidebarContent dashboardMenu-child">
    {jsonData ? (
      <>
      <h2 className="head-medicineTaken">Lab Test</h2>
      <div className="medicine-item3">
      {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */
        console.log(jsonData)}
      {
      jsonData.allLabTestRecords.map((item) => (
        <div key={item._id}>
          
          <div className="medicine-detail3">
          <div><b>Name:</b> <b>{item.testName}</b></div>
          <div><b>Test Details: </b>{item.testDetails}</div>
          <div><b>Date: </b>{item.day} : {item.month} : {item.year}</div>
          <div><b>Time: </b>{item.time}</div>
          <div><b>Result Status: </b>{item.resultStatus}</div>
          <div><b>Result Document: </b>{item.resultDocument}</div>
          </div>
        </div>
        

      ))}
      </div>
      </>
    ) : (
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
    )}
      </div>
    </div>
  </>
  )
}

export default LabTestDetails
