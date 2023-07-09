import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home/Home.js";
import Signup from "./components/Home/Signup.js";
import Login from "./components/Home/Login.js";
import Nav from "./components/Home/Nav.js";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
