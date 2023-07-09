import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./medicineTaken.css"
import { Oval } from "react-loader-spinner";

function MedicineTaken() {
  const [jsonData, setJsonData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/dashboard/medicinelist/${id}`, {
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
				<h2 className="head-medicineTaken">Medicines Taken</h2>
        <div className="medicine-item2" >
				{/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */
				jsonData.medicineTaken.map((item) => (
					<div key={item._id}>
            <div className="medicinecard2">
            <img src={item.image} alt={item.name} />
            <div className="medicine-detail2">
            
						<div><b>Name:</b> {item.name}</div>
						<div><b>Category:</b> {item.category}</div>
						</div>
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
  );
}

export default MedicineTaken;
