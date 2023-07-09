import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import OTPInput, { ResendOTP } from "otp-input-react";

function VerifyYourself() {
	const { id } = useParams();
	const navigate = useNavigate();
	const userVerified = localStorage.getItem("userVerified");
	const [verificationCode, setverificationCode] = useState(null);
	const [OTP, setOTP] = useState("");

	useEffect(() => {
		const fetchVerificationCode = async() => {
			try {
				const response = await axios
					.post(`http://localhost:4000/api/v1/user/varify/${id}`,
				);
				setverificationCode(response.data.varificationCode);
				console.log(response);
			} catch (error) {
				console.log("Error fetching JSON data:", error);
			}
		};
		fetchVerificationCode();
	}, []);

	const handleChangeInput = (e) => {
		setOTP(e.target.value);
		console.log(e.target.value);
	}

	const handleConfirm = async(e) => {
		e.preventDefault();
		console.log(OTP, verificationCode);
		if(OTP !=="" && OTP.toString() === verificationCode.toString())
			await axios
			.post(`http://localhost:4000/api/v1/user/changevarifystatus/${id}`)
			.then( (res) => {
				console.log(res);
				localStorage.setItem("userVerified", true);
				alert("Account Verified!");
				navigate(`/dashboard/user/updateUser/${id}`);
			})
			.catch( (error) => {
				console.log(error);
			});
		else alert("Invalid OTP! Enter the correct OTP.");
	}

	return (
    <>
      <div className="dashboardMenu">
        <Sidebar />
        <div className="sidebarContent dashboardMenu-child">
					<h2 style={{ color: "red", textAlign: "center", padding: "30px auto" }}> Account Not verified! </h2>
					<h3 style={{ fontSize: "20px", fontWeight:"600", padding: "20px auto", textAlign: "center", }}> An OTP has been sent to your registered email ID.<br /> Please enter the OTP to verify</h3>
					<div style={{ display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center", }}>
						<OTPInput value={OTP}
							onChange={setOTP} autoFocus 
							OTPLength={5}
							otpType="number" 
							disabled={false}
							style={{ padding: "20px", }}
						/>
						<button className="btn btn-success" style={{backgroundColor: "#0dba08", }} onClick={handleConfirm} >Verify</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default VerifyYourself;
