import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { Oval } from "react-loader-spinner";

function GetAllUser() {
  const [jsonData, setJsonData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/admin/getalluser`,
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

  const handleVerify = async (params) => {
    await axios
      .post(
        "http://localhost:4000/api/v1/admin/updateuserverification",
        params,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("verification changed to ", params.status);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (userid) => {
    await axios
      .post(
        "http://localhost:4000/api/v1/admin/deleteuser",
        { id: userid },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("user deleted!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="dashboardMenu">
        <AdminSidebar />
        <div className="sidebarContent dashboardMenu-child">
          {jsonData ? (
            <>
              <h2 className="head-medicineTaken">All Users List</h2>
              <div className="medicine-item2">
                {
                  /* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */
                  console.log(jsonData)
                }
                {jsonData.users.map((item) => (
                  <div key={item._id}>
                    <div className="medicinecard2">
                      <div
                        className="medicine-detail2"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <img src={item.image} alt={item.name} />
                        <b>Name: {item.name}</b>
                        <b>Age: {item.age}</b>
                        <b>Address: {item.address}</b>
                        <b>Verification Status: {item.varified.toString()}</b>
                        <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
                        <button
                          className="btn btn-success mx-2"
                          onClick={() => {
                            handleVerify({
                              id: item._id,
                              status: !item.varified,
                            });
                          }}
                        >
                          Verify User
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          Delete User
                        </button>
                        </div>
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

export default GetAllUser;
