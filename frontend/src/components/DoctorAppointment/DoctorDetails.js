import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Oval } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';

const DoctorDetails = () => {
      
    const navigate = useNavigate();
    const { spaciality } = useParams();
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          
             await axios.get(
              `http://localhost:4000/api/v1/doctor/${spaciality}`,
              {
                withCredentials: true,
              }
            ).then((res)=>{
                setJsonData(res.data);
            })
            
          .catch( (error)=>{
            console.log("Error fetching JSON data:", error);
          })
        };
    
        fetchData();
      }, []);



      const registerData = async (doctorId) => {
        await axios
          .post(
            `http://localhost:4000/api/v1/new/appointment/${doctorId}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            alert("some error occured try again");
          });
      };


  return (
    <>
    
    {jsonData ? (
      <>
      <h2 className="head-medicineTaken">Doctors Details</h2>
      <div className="medicine-item3">
      {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */
        console.log(jsonData)}
      {
      jsonData.allDoctors &&
      jsonData.allDoctors.map((item) => (
        <div key={item._id}>
          
          <div className="medicine-detail3" style={{alignItems:"center"}}>
          <div><b>Name:</b> <b>{item.name}</b></div>
          <div><b>Spaciality: </b>{item.spaciality}</div>
          <div><b>Experience: </b>{item.experience}</div>
          <div><b>Qualification: </b>{item.qualification}</div>
          <div>
                <button className='btn btn-success mt-2' onClick={()=>{registerData(item._id)}}>Schedule</button>
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
  )
}

export default DoctorDetails
