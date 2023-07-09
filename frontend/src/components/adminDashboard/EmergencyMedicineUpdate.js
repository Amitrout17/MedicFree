import React, { useEffect, useState } from "react";
import axios from "axios";

import { Oval } from "react-loader-spinner";

const EmergencyMedicineUpdate = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/admin/get/emergencymedicine`,
          {
            withCredentials: true,
          }
        );
        setJsonData(response.data);
        console.log(response);
      } catch (error) {
        console.log("Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInput = async (medIdd,status) => {
    try {
      const response = await axios.post("http://localhost:4000/admin/update/emergencymedicine", {id: medIdd, status}, {
        withCredentials: true,
      });
      setJsonData(response.data);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log("Error fetching JSON data:", error);
    }
  };

  const handleInput2 = async (medId,status) => {
    try {
        const response = await axios.post("http://localhost:4000/admin/update/emergencymedicine", {id: medId, status}, {
        withCredentials: true,
        });
        setJsonData(response.data);
        console.log(response);
        window.location.reload();
    } catch (error) {
        console.log("Error fetching JSON data:", error);
    }
  };
  return (
    <>
      {jsonData ? (
        <>
          <h2 className="head-medicineTaken">Unavailable Medicines</h2>
          <div className="medicine-item2">
            {
              /* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */
              console.log(jsonData)
            }
            {jsonData.emergencyMedicineList.map((item) => (
              <div key={item._id}>
                <div className="medicinecard2">
                  <img src={item.image} alt={item.medicineName} />
                  <div className="medicine-detail2">
                    <div>
                      <b>Name:</b> {item.medicineName}
                    </div>
                    <div>
                      <b>Availibility Status: </b>
                      {item.Availabilitystatus}
                    </div>

                    <button className="btnn" onClick={handleInput(item._id,"approved")}>
                      approved
                    </button>
                    <button className="btnn" onClick={handleInput2(item._id,"Delivered")}>
                      waiting
                    </button>
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
    </>
  );
};

export default EmergencyMedicineUpdate;
