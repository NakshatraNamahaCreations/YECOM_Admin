import React, { useState } from "react";
import "./login.css";
import { InputGroup, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { apiUrl } from "../../Api-Service/apiConstants";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  // const login = () => {
  //   window.location.assign("/dashboard");
  // };
  const [emailOrName, setemailOrName] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: apiUrl.TEAM_LOGIN,
        method: "post",
        baseURL: apiUrl.BASEURL,
        headers: { "content-type": "application/json" },
        data: { email: emailOrName, password: password },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Login Success");
          console.log("Login Response:", response);
          // toast("🦄 Login succesfull", {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,

          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });

          localStorage.setItem("ecomAdmin", JSON.stringify(response.data.user));

          window.location.assign("/Home-page");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      console.log("Login Error", error);
      // toast.error("Invalid email or password", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };

  return (
    <div className="row me-0 justify-center" style={{ alignItems: "center" }}>
      <ToastContainer position="top-right" />

      <div className="col-md-4" style={{ padding: "50px" }}>
        <div className="d-flex" style={{ justifyContent: "center" }}>
          <img
            src="../plogo.png"
            alt=""
            style={{ width: "250px", height: "90px" }}
          />
        </div>

        <p class="accountLogin-heading text-center mt-3">
          Login to your account
        </p>
        <p class="accountLogin-subHeading text-center">
          Please enter your mobile number to continue
        </p>
        <div>
          <div class="accountLogin-mobile-field">
            {/* <InputGroup className="mb-3">
              <Form.Control
                // type="number"
                placeholder="Email id"
                aria-label="Email id"
                aria-describedby="basic-addon1"
                onChange={(e) => setemailOrName(e.target.value)}
              />
            </InputGroup> */}
            <input
              type="tell"
              className="col-md-12 mb-2 mt-2"
              placeholder="Email id"
              value={emailOrName}
              onChange={(e) => setemailOrName(e.target.value)}
              style={{
                border: "1px solid lightgrey",
                height: "45px",
                paddingLeft: "15px",
                borderRadius: "5px",
                outline: "none",
              }}
            />
          </div>
          <div class="accountLogin-mobile-field mt-3">
            {/* <InputGroup className="mb-3">
              <Form.Control
                // type="number"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                onChange={(e) => setpassword(e.target.value)}
              />
            </InputGroup> */}
            {/* <input
              type="tell"
              className="col-md-12 mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              style={{
                border: "1px solid lightgrey",
                height: "45px",
                paddingLeft: "15px",
                borderRadius: "5px",
                outline: "none",
              }}
            /> */}
            <div
              className="accountLogin-mobile-field mt-3"
              style={{ position: "relative" }}
            >
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                className="col-md-12 mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                style={{
                  border: "1px solid lightgrey",
                  height: "45px",
                  paddingLeft: "15px",
                  borderRadius: "5px",
                  outline: "none",
                  width: "100%",
                  paddingRight: "40px", // Space for the eye icon
                }}
              />
              {/* Eye Icon */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "40%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "gray",
                }}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            </div>
          </div>
          <div className="d-flex mt-2" style={{ justifyContent: "center" }}>
            <button className="accountLogin-btn" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
