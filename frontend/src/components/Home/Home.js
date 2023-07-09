import React, { useState } from "react";
import Nav from "./Nav";
import "./css/home.css";

import Banner from "./img/img.jpg";
import axios from "axios";
import TestCenterCards from "./TestCenterCards";
import MedicalCard from "./MedicalCard";
import MedicineCard from "./MedicineCard";
function Home({ user }) {
  const [add, setAdd] = useState("");
  const [show, setshow] = useState(false);
  const [homePageData, sethomePageData] = useState("");
  const [hospitals, sethospitals] = useState("");
  const [tetsCenters, settetsCenters] = useState("");
  const [medicines, setmedicines] = useState();

  const getPincode = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data ? data.address.postcode : ""));
    });
  };

  const loadHomePageData = async () => {
    await new Promise((resolve) => {
      getPincode();
      setTimeout(resolve, 1000); // Adjust the delay as needed
    }).then(async (res) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/get/test-medicine-medical/${add}`
        );
        sethomePageData(response.data);
        setshow(true);
        console.log(response.data);
        settetsCenters(response.data.testList);
        sethospitals(response.data.medicalList);
        setmedicines(response.data.medicineList);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const loadHomePageDataWithPin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/get/test-medicine-medical/${add}`
      );
      sethomePageData(response.data);
      setshow(true);
      settetsCenters(response.data.testList);
      sethospitals(response.data.medicalList);
      setmedicines(response.data.medicineList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav user={user} />
      <div>
        <img src={Banner} alt="" />
      </div>
      <div className="pincode-div">
        <div className="div1">
          <input
            className="inp-pin"
            type="number"
            placeholder="Enter Pincode"
            value={add}
            onChange={(e) => {
              setAdd(e.target.value);
            }}
          />
          <button className="btn-pincode" onClick={loadHomePageDataWithPin}>
            Search Near By Facilites With Pincode
          </button>
        </div>
        <h3 className="pincode-h3">OR</h3>
        <button className={"btn-pincode"} onClick={loadHomePageData}>
          Search Facilites With Currnet Location
        </button>
      </div>

      {show && (
        <>
          <div className="testcenter">
            {/* for showing all medicals */}
            <h3>Test Center Near You</h3>
            <div className="testmap">
              {tetsCenters &&
                tetsCenters.map((item) => <TestCenterCards data={item} />)}
            </div>
          </div>
          <div className="testcenter">
            {/* for showing all testcenters */}
            <h3>Hospitals Near You</h3>
            <div className="testmap">
              {hospitals &&
                hospitals.map((item) => <MedicalCard data={item} />)}
            </div>
          </div>
          <div className="testcenter">
            {/* for showing availabe medicines near by */}
            <h3>Available Medicines</h3>
            <div className="medicine-item">
              {medicines &&
                medicines.map((item) => <MedicineCard data={item} />)}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
