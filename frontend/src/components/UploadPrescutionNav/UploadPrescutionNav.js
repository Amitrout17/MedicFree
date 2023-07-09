import React from 'react'

import Upload1 from "../Home/img/upload1.png";

const UploadPrescutionNav = () => {
  return (
    <div>
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
            />
          </label>
          <button  >Search Medicine</button>

        </div>
      </div>

    </div>
  )
}

export default UploadPrescutionNav
