import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Background from '../Assets/Banner.png';
import logo from "../Assets/logo.png";
import { Link } from 'react-router-dom';

function Login(props) {
  {document.body.style.backgroundImage = "url("+Background+")";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.width = "100vw";
  document.body.style.height = "72vh";}
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})
    const handleonsubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("https://userinfobackend-of4s.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json= await response.json(); 
          // console.log(json);
          if(json.success){
            localStorage.setItem("token",json.Authtoken);
            navigate("/");
            props.showAlert("login successfull","success");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }
    const handleonchange=(e)=>{ 
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
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
              <h5 className="card-title">Login</h5>
              <form onSubmit={handleonsubmit}>
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link to="/signup" className="btn btn-link">Don't have an account? Sign Up</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Login