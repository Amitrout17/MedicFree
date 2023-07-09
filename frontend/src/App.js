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
import GetAllUser from "./components/adminDashboard/UserOperations.js";
import AddNewMedicine from "./components/adminDashboard/AddNewMedicine.js";
import TestConfirmation from "./components/TestScheduling/TestConfirmation.js";
import AIChat from "./components/AIconsultancy/AIchat.js";
import UploadPrescutionNav from "./components/UploadPrescutionNav/UploadPrescutionNav.js";
import VideoCall from "./components/DoctorAppointment/VideoCall.js";
import ChatRoom from "./components/Chatroom/ChatRoom.js";
import DoctorAppointment from "./components/DoctorAppointment/DoctorAppointment.js";
import Room from "./components/DoctorAppointment/Room/Room.js";

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
        {/*upload prescution in the navbar */}

        <Route
          path="/prescription/upload"
          element={
            <>
              <Nav user={user} />
              <UploadPrescutionNav user={user} />
            </>
          }
        />

        {/* medicine booking router */}
        <Route
          path="/medicine/book/:medicineId/:store_id"
          element={
            <>
              <Nav user={user} />
              <UploadPrescution user={user} />
            </>
          }
        />
        <Route
          path="/ChatRoom"
          element={
            <>
              <Nav user={user} />
              {user ? <ChatRoom user={user} /> : ""}
            </>
          }
        />
        <Route
          path="/medicine/requrest/unavailabe"
          element={
            <>
              <Nav user={user} />
              <Unavailablemedicine user={user} />
            </>
          }
        />
        <Route
          path="/medicine/requrest/unavailabe/conformbooking/:id"
          element={
            <>
              <Nav user={user} />
              <Conformpage user={user} />
            </>
          }
        />
        <Route
          path="/medicine/requrest/unavailabe/conformbooking/status/:id"
          element={
            <>
              <Nav user={user} />
              <Status user={user} />
            </>
          }
        />

        {/*Doctor Appointment*/}
        <Route
          path="/appointment/doctor"
          element={
            <>
              <Nav user={user} />
              <DoctorAppointment user={user} />
            </>
          }
        />

        <Route
          path="/medicine/requrest/emergency"
          element={
            <>
              <Nav user={user} />
              <Emergencymedicine user={user} />
            </>
          }
        />
        <Route
          path="/medicine/requrest/emergency/conformbooking/:id"
          element={
            <>
              <Nav user={user} />
              <Confirm user={user} />
            </>
          }
        />
        <Route
          path="/medicine/requrest/emergency/conformbooking/statuspage/:id"
          element={
            <>
              <Nav user={user} />
              <Statuspage user={user} />
            </>
          }
        />

        <Route
          path="/medicine/requrest/emergency"
          element={
            <>
              <Nav user={user} />
              <Emergencymedicine user={user} />
            </>
          }
        />
        <Route
          path="/medicine/requrest/emergency/conformbooking/:id"
          element={
            <>
              <Nav user={user} />
              <Confirm user={user} />
            </>
          }
        />
        <Route
          path="/medicine/requrest/emergency/conformbooking/statuspage/:id"
          element={
            <>
              <Nav user={user} />
              <Statuspage user={user} />
            </>
          }
        />
        {/* Test scheduling routes */}
        <Route
          path="/test/testCenters/details/all/:id"
          element={
            <>
              <Nav user={user} />
              <TestCenerDetails user={user} />
            </>
          }
        />
        <Route
          path="/test/confirmation/:id"
          element={
            <>
              <Nav user={user} />
              <TestConfirmation />
            </>
          }
        />

        {/* Doctor Appointment */}

        <Route
          path="/doctor/vcall"
          element={
            <>
              <Nav user={user} />
              <VideoCall />
            </>
          }
        />
        <Route
          path="/doctor/vcall/room/:roomID"
          element={
            <>
              <Nav user={user} />
              <Room />
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


        {/* admin route */}
        <Route
          path="/dashboard/admin/userdetails/:id"
          element={
            <>
              <Nav user={user} />
              <GetAllUser />
            </>
          }
        />

        <Route
          path="/dashboard/admin/addmedicine/:id"
          element={
            <>
              <Nav user={user} />
              <AddNewMedicine />
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
