import React from 'react'
import navImg1 from './img/nav-img-2.jpg'
import navImg2 from './img/nav-img-3.jpg'
import navImg3 from './img/nav-img-4.jpg'
import './css/Nav2.css'
import { Link } from "react-router-dom";
const Nav2 = () => {
  return (
    <div>
      
        <nav>
            <ul >

            <li>
            <Link style={{textDecoration:"none"}} to={"/medicine/requrest/unavailabe"}>
            
              
              <div className='Inimg'> <img className="navimg"src={navImg1} alt="" /><div className='Intext'><span>Unavailabe Medicine Request</span><p>Get Medicine We Dont Have</p></div></div>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to={"/appointment/doctor"}>
            
              
             <div className='Inimg'><img className="navimg" src={navImg2} alt="" /><div className='Intext'><span>Doctor Appointment</span><p>Over 1000 Appointment</p></div></div> 
            </Link>
          </li> 
        <li> 
            <Link style={{textDecoration:"none"}}to={"/medicine/requrest/emergency"}>
           
              
              <div className='Inimg'> <img className="navimg" src={navImg3} alt="" /> <div className='Intext'><span>Emergency Medicine Request</span><p>More Information</p></div></div>
            </Link>
          </li>
          
          
          </ul>
        </nav>
      </div>
      
    
  )
}



export default Nav2
