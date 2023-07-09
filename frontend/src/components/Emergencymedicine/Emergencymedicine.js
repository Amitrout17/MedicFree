import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

//import Upload from "../Home/img/upload 2.png";
import "./emergencyMedicine.css";

const Emergencymedicine = ({ user }) => {
  const [files, setFiles] = useState(null);
  const [mname, setMname] = useState("");
  const [formSubmitted, setFormSumbitted] = useState(false);
  const [show, setshow] = useState(false);

  const navigate = useNavigate();

  const scanPrescution = async (e) => {
    e.preventDefault();
    setFormSumbitted(true);
    const formData = new FormData();

    formData.append("files", files);
    await axios
      .post("http://localhost:4000/api/v1/ml/scan", formData, {
        withCredentials: true,
      })
      .then((res) => {
        setFormSumbitted(false);
        console.log(res.data.result);
        setMname(res.data.result);
        setshow(true);
      })
      .catch((err) => {
        alert("some error occured while scanning, pls try manually");
        setFormSumbitted(false);
        console.log(err);
      });
  };

  const submitHandler = async (e) => {
    console.log(files);
    if (mname !== "" && files !== null) {
      setFormSumbitted(true);
      e.preventDefault();
      const formData = new FormData();

      formData.append("files", files);
      formData.append("medicineName", mname);
      console.log(formData);
      await axios
        .post("http://localhost:4000/api/emergencyMedicine/new", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.sucess === true) {
            navigate(
              `/medicine/requrest/emergency/conformbooking/${response.data.newRequest._id}`
            );
          } else {
            alert("Enter Valid Credentials");
          }
        })
        .catch((e) => {
          setFormSumbitted(false);
          alert(e.response.data.message);
          console.log(e);
        });
    } else {
      alert("Both fields are required!");
    }
  };

  const webpage = formSubmitted ? (
    <div style={{ height: "60vh", display: "flex" }}>
      <div
        style={{
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </div>
  ) : (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Enter your Emergency Medicine details
      </h3>
      <div className="wrapper">
        <div className="indiv">
          <div>
            {show && (
              <p
                style={{
                  margin: 0,
                  textTransform: "uppercase",
                  fontSize: "13px",
                  color: "red",
                }}
              >
                please Change the Name of Medicine if you find incorrect
              </p>
            )}
            <form>
              <label
                style={{
                  fontSize: "18px",
                  paddingLeft: "7px",
                  fontWeight: "500",
                }}
                htmlFor="fname"
              >
                Medicine name:{" "}
              </label>

              <br />
              <input
                className="input-tar"
                type="text"
                id="Mname"
                name="mname"
                value={mname}
                onChange={(e) => {
                  setMname(e.target.value);
                }}
              />
              <br />
              <label htmlFor="fileBTN-upload" className="drop-container">
                <span className="drop-title" style={{ marginBottom: "30px" }}>
                  Drop Prescution Image here
                </span>
                <div style={{ width: "150px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 60">
                    <path d="M56.9358018,0.887952143 L87.1245072,1.94216497 L95.1229308,10.5194242 L93.649924,52.7008195 C93.6036653,54.0254955 92.5349073,55.07339 91.2286594,55.11247 L91.0641982,55.1120479 L68.9993032,54.34053 L69,58 C69,59.1045695 68.1045695,60 67,60 L31,60 C29.8954305,60 29,59.1045695 29,58 L28.9993032,54.26853 L4.93575717,55.1094924 C3.61108122,55.1557511 2.49118654,54.162694 2.36108243,52.862354 L2.35003136,52.6982641 L0.67485552,4.72750438 C0.628596816,3.40282843 1.62165394,2.28293375 2.92199388,2.15282964 L3.08608385,2.14177857 L33.2747893,1.08756574 L40.5172077,7.8412302 L40.3683032,7.99952995 L54.1853032,7.99952995 L54.350076,3.29918047 C54.3963347,1.97450452 55.4650927,0.926610013 56.7713406,0.887529955 L56.9358018,0.887952143 Z M59.9993032,8.99952995 L31,9 C30.4871642,9 30.0644928,9.38604019 30.0067277,9.88337887 L30,10 L29.9993032,38.99953 L50,39 C50.5522847,39 51,39.4477153 51,40 L51,51 C51,51.5522847 50.5522847,52 50,52 L29.9993032,51.99953 L30,58 C30,58.5128358 30.3860402,58.9355072 30.8833789,58.9932723 L31,59 L67,59 C67.5128358,59 67.9355072,58.6139598 67.9932723,58.1166211 L68,58 L67.9993032,16.99953 L60,17 L59.9993032,8.99952995 Z M56.9009023,1.88734297 C56.1216811,1.86013197 55.4605576,2.43229572 55.3613708,3.1899476 L55.3494668,3.33407997 L55.1863032,7.99952995 L61,8 L69,16 L68.9991926,25.6289267 C70.5660308,24.8310303 72.3185302,24.4353033 74.1222153,24.4982894 C79.9176726,24.7006712 84.4517561,29.5628805 84.2493743,35.3583378 C84.0469925,41.1537951 79.1847832,45.6878786 73.3893259,45.4854968 C71.8381588,45.4313288 70.3473363,45.0415105 68.9989737,44.3553556 L68.9993032,53.34053 L91.0990977,54.112657 C91.8783189,54.139868 92.5394424,53.5677043 92.6386292,52.8100524 L92.6505332,52.66592 L94.0793032,11.69053 L86.5859814,11.4291499 L85.5865905,11.3942504 L85.8833032,2.89752995 L56.9009023,1.88734297 Z M32.1023032,2.12752995 L3.12098334,3.1411694 C2.34176219,3.1683804 1.72216126,3.78526803 1.67606716,4.54799323 L1.67424635,4.69260488 L3.34942219,52.6633646 C3.37663319,53.4425857 3.99352083,54.0621867 4.75624602,54.1082808 L4.90085767,54.1101016 L28.9993032,53.26853 L28.9993032,51.99953 L28,52 C27.4477153,52 27,51.5522847 27,51 L26.9993032,44.83453 L19.5950841,45.0933432 L19.595119,45.0943425 L18.5957281,45.129242 L18.5956932,45.1282427 L13.5987391,45.3027401 L13.598774,45.3037395 L12.5993832,45.338639 L11.8664937,24.3514317 L28.9993032,23.75253 L29,10 C29,8.8954305 29.8954305,8 31,8 L32.3073032,7.99952995 L32.1023032,2.12752995 Z M59,50 L59,51 L53,51 L53,50 L59,50 Z M32.3146067,42 L30,42 L30,49 L31.3033708,49 L31.3033708,46.4311927 L32.3595506,46.4311927 C33.9438202,46.4311927 35.1573034,45.7140673 35.1573034,44.1620795 C35.1573034,42.5351682 33.9438202,42 32.3146067,42 Z M38.505618,42 L36.5393258,42 L36.5393258,49 L38.5730337,49 C40.752809,49 42.0786517,47.7905199 42.0786517,45.4678899 C42.0786517,43.1559633 40.752809,42 38.505618,42 Z M48,42 L43.5617978,42 L43.5617978,49 L44.8651685,49 L44.8651685,46.0779817 L47.5393258,46.0779817 L47.5393258,45.029052 L44.8651685,45.029052 L44.8651685,43.0489297 L48,43.0489297 L48,42 Z M38.4157303,43.0061162 C39.8988764,43.0061162 40.741573,43.7553517 40.741573,45.4678899 C40.741573,47.1222018 39.9649438,47.9281908 38.5906208,47.990023 L38.4157303,47.9938838 L37.8426966,47.9938838 L37.8426966,43.0061162 L38.4157303,43.0061162 Z M59,45 L59,46 L53,46 L53,45 L59,45 Z M32.2134831,42.9954128 C33.3033708,42.9954128 33.8764045,43.2844037 33.8764045,44.1620795 C33.8764045,44.9679799 33.4086155,45.3851518 32.4449351,45.4314423 L32.258427,45.4357798 L31.3033708,45.4357798 L31.3033708,42.9954128 L32.2134831,42.9954128 Z M69.0265641,26.7510919 L68.9993032,26.76653 L68.9996167,43.2178828 C70.3344397,43.991422 71.8438183,44.4309169 73.4242254,44.4861059 C78.3287144,44.6573745 82.4944919,41.0794986 83.1625055,36.3253363 L73.720804,35.9951266 L74.0873158,25.4976802 L74.0873158,25.4976802 C72.2889112,25.4348785 70.5488066,25.8752929 69.0265641,26.7510919 Z M18.4212307,40.1322879 L13.4242765,40.3067854 L13.5638396,44.3033493 L18.5607937,44.1288518 L18.4212307,40.1322879 Z M27.0141292,39.8315388 L19.4206215,40.0973884 L19.5601846,44.0939523 L26.9993032,43.83453 L27,40 C27,39.9425877 27.0048382,39.8863055 27.0141292,39.8315388 Z M59,40 L59,41 L53,41 L53,40 L59,40 Z M18.2467332,35.1353338 L13.249779,35.3098313 L13.389377,39.3073946 L18.3863312,39.1328971 L18.2467332,35.1353338 Z M28.9993032,34.75853 L19.246124,35.1004343 L19.385722,39.0979976 L28.9993032,38.76153 L28.9993032,34.75853 Z M59,35 L59,36 L39,36 L39,35 L59,35 Z M18.0722357,30.1383796 L13.0752816,30.3128771 L13.2148795,34.3104404 L18.2118337,34.1359429 L18.0722357,30.1383796 Z M28.9993032,29.75553 L19.0716265,30.1034801 L19.2112245,34.1010435 L28.9993032,33.75853 L28.9993032,29.75553 Z M59,30 L59,31 L39,31 L39,30 L59,30 Z M17.8977382,25.1414255 L12.9007841,25.315923 L13.0403821,29.3134863 L18.0373362,29.1389888 L17.8977382,25.1414255 Z M28.9993032,24.75353 L18.897129,25.106526 L19.036727,29.1040893 L28.9993032,28.75553 L28.9993032,24.75353 Z M60.9993032,9.41452995 L60.9993032,15.99953 L67.5843032,15.99953 L60.9993032,9.41452995 Z M86.8743032,3.14052995 L86.6203032,10.42953 L93.9093032,10.68353 L86.8743032,3.14052995 Z M33.1093032,2.29952995 L33.3083032,7.99952995 L39.2203032,7.99952995 L33.1093032,2.29952995 Z"></path>
                  </svg>
                </div>

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
              <button onClick={scanPrescution}>Scan Prescution</button>

              <input
                className="btnn yan"
                type="submit"
                onClick={submitHandler}
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return webpage;
};

export default Emergencymedicine;
