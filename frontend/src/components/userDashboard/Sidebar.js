import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import UserNotVerified from "./img/usernotverified.png";
import UserVerified from "./img/userverified.png";
import UpdateUser from "./img/updateuser.png";
import UserIcon from "./img/usericon.png";
import MedicineTaken from "./img/medicinetaken.png";
import MedicineUnavailable from "./img/medicineunavailable.png";
import MedicineEmergency from "./img/medicineemergency.png";
import LabTest from "./img/labTest.png";

function Sidebar() {
  const id = localStorage.getItem("userId");
  const username = localStorage.getItem("userName");
	const userVerified = localStorage.getItem("userVerified");
  const iconStyle = { width: "30px", height: "30px" };
	console.log(userVerified, typeof userVerified);
	const verified = userVerified == "false" ?
    {
      title: "Not Verified",
      link: `/dashboard/user/verifyyourself/${id}`,
      icon: UserNotVerified,
      iconStyle: iconStyle,
    } :
    {
      title: "Account Verified",
      link: `#`,
      icon: UserVerified,
      iconStyle: iconStyle,
    };
  const sidebarData = [
		verified,
    {
      title: "Update Profile",
      link: `/dashboard/user/updateUser/${id}`,
      icon: UpdateUser,
      iconStyle: iconStyle,
    },
    {
      title: "Medicines Taken",
      link: `/dashboard/user/medicineTaken/${id}`,
      icon: MedicineTaken,
      iconStyle: iconStyle,
    },
    {
      title: "Unavailable Medicine",
      link: `/dashboard/user/unavailableMedicine/${id}`,
      icon: MedicineUnavailable,
      iconStyle: iconStyle,
    },
    {
      title: "Emergency Medicine",
      link: `/dashboard/user/emergencyMedicine/${id}`,
      icon: MedicineEmergency,
      iconStyle: iconStyle,
    },
    {
      title: "Lab Test",
      link: `/dashboard/user/labTest/${id}`,
      icon: LabTest,
      iconStyle: iconStyle,
    },
  ];

  return (
    <div className="navigationPanel dashboardMenu-child">
      <ul className="sidebarList">
        <li
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "25px 0",
          }}
        >
          <img
            src={UserIcon}
            style={{ width: "80px", height: "80px" }}
            alt=""
          />
          <div style={{ fontWeight: "600", fontSize: "26px" }}>{username}</div>
        </li>
        {sidebarData.map((item, key) => {
          const activeClass =
            window.location.pathname === item.link
              ? "activeLink"
              : "sidebarListItem";
          return (
            <Link to={item.link} className={activeClass} key={key}>
              <div>
                <div className="flexbox-column">
                  <img src={item.icon} style={item.iconStyle} alt=" " />
                  <li>{item.title}</li>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

{
  /*
      <ul>
        <Link to={`/dashboard/user/profile/${id}`}>
          <li>user dashboard</li>
        </Link>
        <Link to={`/dashboard/user/medicineTaken/${id}`}>
          <li>Medicine Taken</li>
        </Link>
        <Link to={`/dashboard/user/updateUser/${id}`}>
          <li>Update Info</li>
        </Link>
      </ul>
    </div>
  );
*/
}

export default Sidebar;
