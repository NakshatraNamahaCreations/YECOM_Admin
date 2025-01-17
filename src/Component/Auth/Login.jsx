import React, { useState } from "react";
import "./login.css";
import { InputGroup, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { apiUrl } from "../../Api-Service/apiConstants";

function Login() {
  // const login = () => {
  //   window.location.assign("/dashboard");
  // };
  const [emailOrName, setemailOrName] = useState("");
  const [password, setpassword] = useState("");

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

          window.location.assign("/dashboard");
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
    <div className="row me-0">
      <ToastContainer position="top-right" />
      <div className="col-md-6" style={{ backgroundColor: "#F7FAFC" }}>
        <div style={{ padding: "100px" }}>
          <p class="login-left-heading">The future of education is here</p>
          <p class="login-left-subheading">
            {" "}
            With an all in one platform for the teaching world
          </p>
        </div>
        <div>
          {/* <img
            src="login-image.jpg"
            alt=""
            style={{ position: "absolute", width: "100px", left: "5%" }}
          /> */}
        </div>
      </div>
      <div className="col-md-6" style={{ padding: "100px" }}>
        <p class="accountLogin-heading">Login to your account</p>
        <p class="accountLogin-subHeading">
          Please enter your mobile number to continue
        </p>
        <div>
          <div class="accountLogin-mobile-field">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"></InputGroup.Text>
              <Form.Control
                // type="number"
                placeholder="Email id"
                aria-label="Email id"
                aria-describedby="basic-addon1"
                onChange={(e) => setemailOrName(e.target.value)}
              />
            </InputGroup>
          </div>
          <div class="accountLogin-mobile-field">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"></InputGroup.Text>
              <Form.Control
                // type="number"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                onChange={(e) => setpassword(e.target.value)}
              />
            </InputGroup>
          </div>
          <button className="accountLogin-btn" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
