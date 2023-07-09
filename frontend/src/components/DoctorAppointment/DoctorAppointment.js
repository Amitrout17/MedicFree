import React from 'react'
import { Link } from "react-router-dom";
import "./doctor.css"
import Heart from "./images/heart.png"
import Arrow from "./images/icons8-arrow-50.png"
const DoctorAppointment = () => {
  return (<>
    <div className='doctor-item'>
      <div className='one-item'>
      <Link style={{textDecoration:"none"}} > 
      <div className='doctor-detail'>
        <img src={Heart} className='fir-img' alt=''></img>
          <div className='inner-detail'>
            <b>Cardiology</b>
            <p>For Heart and Blood pressure problem</p>
          </div>
          <img src={Arrow} className='last-img' alt=''></img>
          
      </div>
      <hr  style={{width:"450px"}}/>
      <b className='last-para'>Chest pain, Heart Failure and cholestrol </b>
          
      </Link>
    </div>
      <div className='one-item'>
      <Link style={{textDecoration:"none"}} > 
      <div className='doctor-detail'>
        <img src={Heart} className='fir-img' alt=''></img>
          <div className='inner-detail'>
            <b>Cardiology</b>
            <p>For Heart and Blood pressure problem</p>
          </div>
          <img src={Arrow} className='last-img' alt=''></img>
          
      </div>
      <hr  style={{width:"450px"}}/>
      <b className='last-para'>Chest pain, Heart Failure and cholestrol </b>
          
      </Link>
    </div>
      <div className='one-item'>
      <Link style={{textDecoration:"none"}} > 
      <div className='doctor-detail'>
        <img src={Heart} className='fir-img' alt=''></img>
          <div className='inner-detail'>
            <b>Cardiology</b>
            <p>For Heart and Blood pressure problem</p>
          </div>
          <img src={Arrow} className='last-img' alt=''></img>
          
      </div>
      <hr  style={{width:"450px"}}/>
      <b className='last-para'>Chest pain, Heart Failure and cholestrol </b>
          
      </Link>
    </div>
    </div>
    </>
  )
}

export default DoctorAppointment
