import React from 'react';
import Background from '../Assets/Banner.png';
import Createuser from "./CreateUser";
import { useNavigate } from "react-router-dom";

function Home(props) {
  {document.body.style.backgroundImage = "url("+Background+")";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.width = "100vw";
  document.body.style.height = "72vh";}
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    props.showAlert("logout successfull", "success");
  };
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h1 className='text-center'>Welcome User</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handlelogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Createuser showAlert={props.showAlert}/>
    </>
  )
}

export default Home