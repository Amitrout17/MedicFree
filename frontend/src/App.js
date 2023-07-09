import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home/Home.js";
import Signup from "./components/Home/Signup.js";
import Login from "./components/Home/Login.js";
import UploadPrescution from "./components/MedicineBooking/UploadPrescution.js";
import Unavailablemedicine from "./components/Unavailablemedicine/UnavailableMedicine.js";
import Emergencymedicine from "./components/Emergencymedicine/Emergencymedicine.js";

import Conformpage from "./components/Unavailablemedicine/Conformpage.js";
import Confirm from "./components/Emergencymedicine/confirm.js";

import Nav from "./components/Home/Nav.js";
import Status from "./components/Unavailablemedicine/Status.js";
import Statuspage from "./components/Emergencymedicine/Statuspage.js";
import TestCenerDetails from "./components/TestScheduling/TestCenerDetails.js";
import DashboardHome from "./components/userDashboard/DashboardHome.js";
import MedicineTaken from "./components/userDashboard/MedicineTaken.js";
import UserProfile from "./components/userDashboard/UserProfile.js";
import UnavailableMedicine from "./components/userDashboard/UnavailableMedicine.js";
import UserEmergencyMedicine from "./components/userDashboard/UserEmergencyMedicine.js";
import UserLabTest from "./components/userDashboard/LabTestDetails.js";
import VerifyUser from "./components/userDashboard/VerifyUser.js";
import TestConfirmation from "./components/TestScheduling/TestConfirmation.js";
import AIChat from "./components/AIconsultancy/AIchat.js";

function App() {
  const [user, setuser] = useState();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/load",
          // 👇️ set withCredentials to `true`
          {
            withCredentials: true,
          }
        );
        setuser(response.data.UserData);
        localStorage.setItem("userId", response.data.UserData._id);
        localStorage.setItem("userName", response.data.UserData.name);
        localStorage.setItem("userVerified", response.data.UserData.varified);
      } catch (error) {
        setuser(error.response.data);
      }
    };
    loadUser();
  }, []);

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        {/* user registration and authentication router */}

        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={
            <>
              <Nav user={user} />
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Nav user={user} />
              <Signup />
            </>
          }
        />

        {/* user dashboard  */}
        <Route
          path="/dashboard/user/profile/:id"
          element={
            <>
              <Nav user={user} />
              <DashboardHome />
            </>
          }
        />
        <Route
          path="/dashboard/user/medicineTaken/:id"
          element={
            <>
              <Nav user={user} />
              <MedicineTaken />
            </>
          }
        />
        <Route
          path="/dashboard/user/updateUser/:id"
          element={
            <>
              <Nav user={user} />
              <UserProfile />
            </>
          }
        />
        <Route
          path="/dashboard/user/unavailableMedicine/:id"
          element={
            <>
              <Nav user={user} />
              <UnavailableMedicine />
            </>
          }
        />
        <Route
          path="/dashboard/user/emergencyMedicine/:id"
          element={
            <>
              <Nav user={user} />
              <UserEmergencyMedicine />
            </>
          }
        />
        <Route
          path="/dashboard/user/labTest/:id"
          element={
            <>
              <Nav user={user} />
              <UserLabTest />
            </>
          }
        />
        <Route
          path="/dashboard/user/verifyyourself/:id"
          element={
            <>
              <Nav user={user} />
              <VerifyUser />
            </>
          }
        />

        {/* ai chat consultancy */}
        <Route
          path="/ai/chat"
          element={
            <>
              <Nav user={user} />
              <AIChat />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
