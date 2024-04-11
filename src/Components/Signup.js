import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Assets/Banner.png";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";

function Signup(props) {
  {
    document.body.style.backgroundImage = "url(" + Background + ")";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.width = "100vw";
    document.body.style.height = "72vh";
  }
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleonsubmit = async (e) => {
    e.preventDefault();
    // const  {name,email,password}=credentials;
    const response = await fetch("https://userinfobackend-of4s.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.Authtoken);
      navigate("/");
      props.showAlert("Signup Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const handleonchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-light">
            <div className="card-header">
              <img src={logo} alt="Logo" className="img-fluid" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Sign Up</h5>
              <form onSubmit={handleonsubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter your name"
                    onChange={handleonchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                    onChange={handleonchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter a password (min. 7 characters)"
                    onChange={handleonchange}
                    minLength={7}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Confirm your password"
                    onChange={handleonchange}
                    minLength={7}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link to="/login" className="btn btn-link">Already have an account? Log in</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signup;
