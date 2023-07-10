import React from "react";
import { Link, useParams } from "react-router-dom";
import "./css/Nav.css";
import Nav2 from "./Nav2";

function nav({ user }) {
  const userVerified = localStorage.getItem("userVerified");
  return user ? (
    <>
      <div className="navigation-bar-div">
        <div className="logo-and-name">
          {/* div for logo and name */}
          Medic
          <span
            style={{
              color: "green",
            }}
          >
            Free
          </span>
        </div>
        <ul className="navigation-bar-ul">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {user.name ? (
            user.role === "user" ? (
              <li>
                <Link
                  to={
                    userVerified === "true"
                      ? `/dashboard/user/updateUser/${user._id}`
                      : `/dashboard/user/verifyyourself/${user._id}`
                  }
                >
                  {user.name}
                </Link>
              </li>
            ) : (
              <li>
                <Link to={`/dashboard/admin/userdetails/${user._id}`}>
                  {user.name}
                </Link>
              </li>
            )
          ) : (
            <li>
              <Link to={"/signup"}>Sign up</Link>
            </li>
          )}

          <li>
            <Link to={"/prescription/upload"}>Upload Prescription</Link>
          </li>
          <li>
            <Link to={"/chatroom"}>Joint Patient Chat Room</Link>
          </li>
          <li>
            {user.role == "user" ? (
              <Link to={`/user/home/doctorseye/${user._id}`}>Doctor's Eye</Link>
            ) : (
              <Link to={`/user/home/doctorseye/doc/6490aba82986ba9ccbf04741`}>
                Doctor's Eye
              </Link>
            )}
          </li>

          <li>
            <Link to={"/ai/chat"}>AI Consultancy</Link>
          </li>

          {/*  <li>
              <Link to={"/medicine/request/emergency"}>
                Emergency Medicine Request
              </Link>
            </li>
            <li>
              <Link to={"/medicine/requrest/unavailabe"}>
                unavailable Medicine Request
              </Link>
            </li>
            <li>
              <Link to={"/appointment/doctor"}>Doctor appointment</Link>
            </li> */}
        </ul>
      </div>
      <Nav2 user={user} />
      <hr />
      {/* div for navigation bar items */}
    </>
  ) : (
    <div />
  );
}

export default nav;
