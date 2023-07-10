import React, { useRef, useState } from "react";

import Upload1 from "../Home/img/upload1.png";
import axios from "axios";
import UploadPrescutionCards from "./UploadPrescutionCards";
import MedicineCard from "../Home/MedicineCard";

const UploadPrescutionNav = () => {
  const [files, setFiles] = useState(null);
  const [medicine, setmedicine] = useState();
  const bottomRef = useRef(null);

  const scanPrescution = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("files", files);
    await axios
      .post("http://localhost:4000/api/v1/search/medicine", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.result.medicines);
        setmedicine(res.data.result.medicines);
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => {
        alert("some error occured while scanning, pls try manually");
        console.log(err);
      });
  };

  return (
    <div ref={bottomRef}>
      <div class="wrapper">
        <div className="indiv">
          <h2>GET YOUR MEDICINE</h2>
          <h5>Upload prescution for get your desired medicine you want</h5>
          <label htmlFor="fileBTN-upload" className="drop-container">
            <img src={Upload1} alt="" />
            <span className="drop-title">Drop files here</span>
            <input
              type="file"
              id="fileBTN-upload"
              accept="image/*"
              onChange={(e) => {
                e.preventDefault();

                setFiles(e.target.files[0]);
              }}
            />
          </label>
          <button onClick={scanPrescution}>Search Medicine</button>
        </div>
      </div>

      {medicine && medicine.length === 0 ? (
        <p>no medicine found</p>
      ) : (
        <div className="medicine-item">
          {medicine && medicine.map((item) => <MedicineCard data={item} />)}
        </div>
      )}
    </div>
  );
};

export default UploadPrescutionNav;
