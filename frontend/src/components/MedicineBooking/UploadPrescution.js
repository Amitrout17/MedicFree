import axios from "axios";
import React, { useState} from "react";
import {  useParams } from "react-router-dom";
import "./uploadprescution.css";
import Upload from "../Home/img/upload 2.png";


function UploadPrescution({ user }) {



  const [files, setFiles] = useState(null);
  const [varified, setvarified] = useState(false);
  const [book, setbook] = useState(false);
  const [bookingData, setbookingData] = useState();
  const { medicineId, store_id } = useParams();

  const onFileUpladChange = async (e) => {
    e.preventDefault();


    try {
      const formData = new FormData();

      console.log("files included");
      formData.append("files", e.target.files[0]);
      console.log(formData);
      await axios
        .post(`http://localhost:4000/api/v1/ml/varify/prescution`, formData)
        .then((res) => {
          setvarified(res.data.success);
          alert("Document Uploaded, click for varification");
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.log(e);
        });
      console.log(formData);
    } catch (error) {
      console.error(error);
      window.alert(error.message + " Try Again");
    }
  };

  const documentVarify = async () => {
    if (varified) {
      alert("document varified");
      setbook(true);
    } else {
      alert("document not varified");
    }
  };
    
  const bookMedicine = async () => {
    await axios
      .post(
        "http://localhost:4000/api/v1/booking/medicine/new",
        {
          storeId: store_id,
          medicineId: medicineId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setbookingData(res.data.responseData);
        
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };


  return (
    <>
      <div class="wrapper">
        <div className="indiv">
          <h2>UPLOAD FILES</h2>
          <h5>Upload prescution for verification and further process</h5>
          <label htmlFor="fileBTN-upload" className="drop-container">
            <img src={Upload} alt="" />
            <span className="drop-title">Drop files here</span>
            <input
              type="file"
              onChange={onFileUpladChange}
              id="fileBTN-upload"
            />
          </label>
          <button  onClick={documentVarify}>varify document</button>

          {book && (
            <button className="btnn"  onClick={bookMedicine}>
              Book Medicine
            </button>
   
          )}
        </div>
      </div>

      {bookingData && (
        <div>
          <div className="">
            {/* design to show confirmation */}
            <h6 className="heading-detail">Your Booking has been confirmed</h6>
            <p className="heading-detail">
              pls pickup the medicine from the bellow store
            </p>
          </div>
          <div className="detailcol">
            <div className="col-item">
              <h3>Medicine Pickup Details</h3>
              <div className="input-detail">
                <img src={bookingData.StoreImage} alt="" />

                <span>Store Name: {bookingData.storeName}</span>
                <p>
                  <span>Address: </span>
                  {bookingData.address}
                </p>
                <p style={{ marginTop: "-13px" }}>
                  <span>PinCode: </span>
                  {bookingData.pinCode}
                </p>
              </div>
            </div>
            <div className="col-item">
              <h3>Medicine Details</h3>
              <div className="input-detail">
                <img src={bookingData.image} alt="" />
                <span>Name: {bookingData.medicineName}</span>
                <p>
                  <span>Category:</span> {bookingData.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadPrescution;
