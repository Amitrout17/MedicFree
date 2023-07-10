import React, { useEffect, useState } from "react";
import axios from "axios";

import { Oval } from "react-loader-spinner";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

const LabTestUpdate = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/admin/getpendingtestresults`, {
          withCredentials: true,
        })
        .then((response) => {
          setJsonData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log("Error fetching JSON data:", error);
        });
    };

    fetchData();
  }, []);

  const handleInput = async (medIdd) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/admin/processingtestresults",
        { id: medIdd },
        {
          withCredentials: true,
        }
      );
      setJsonData(response.data);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log("Error fetching JSON data:", error);
    }
  };

  //   const handleInput2 = async (medId) => {
  //     try {

  //     } catch (error) {
  //       console.log("Error fetching JSON data:", error);
  //     }
  //   };
  return (
    <>
      <div className="dashboardMenu">
        <AdminSidebar />
        <div className="sidebarContent dashboardMenu-child">
          {jsonData ? (
            <>
              <h2 className="head-medicineTaken mb-5 ">Lab Test</h2>
              <div className="medicine-detail4 mx-3">
                {
                  /* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */
                  //   console.log(jsonData.testResult)
                }
                {jsonData.getTestResults &&
                  jsonData.getTestResults.map((item) => (
                    <div key={item._id}>
                      <div className="medicine-detail2 shade-des" style={{maxWidth:"400px"}}>
                      <div>
                          <b>Test Id:</b> {item._id}
                        </div>
                        <div>
                          <b>Test Name:</b> {item.testName}
                        </div>
                        <div>
                          <b>Test Details:</b> {item.testDetails}
                        </div>
                        <div>
                          <b>Result Status: </b>
                          {item.resultStatus}
                        </div>
                        <div style={{ overflowX: "hidden"}}>
                          <b>Result Document: </b>
                          {item.resultDocument ==="NA" ?
                          "NA"
                          :
                          <Link to={item.resultDocument}>{item.resultDocument}</Link>}
                          
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                          }}
                        >
                          <button
                            className="btn btn-success mx-2"
                            disabled={
                              item.resultStatus === "processing" || item.resultStatus === "published"
                                ? true
                                : false
                            }
                            onClick={() => {
                              handleInput(item._id);
                            }}
                            
                          >
                            processing
                          </button>
                          <Link
                            to={`/dashboard/admin/labtest/upload/${item._id}`}
                          >
                            <button className="btn btn-success">
                              published
                            </button>
                          </Link>
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
};

export default LabTestUpdate;
