import React from "react";
import Adduser from "./Adduser";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import del from "../Assets/delete.png";
import view from "../Assets/view.png";

function Createuser(props) {
  const navigate = useNavigate();
  const { showAlert } = props;
  // const host = "http://localhost:5000";
  const [data, setdata] = useState([]);
  const getdata = async () => {
    //API call
    const response = await fetch("https://userinfobackend-of4s.onrender.com/api/user/fetchaInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log("Response from API:", json); // Log response data
    setdata(json);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getdata();
    } else {
      navigate("/login");
    }
  }, );

  //Delete a data
  const deletenote = async (id) => {
    //Deleting a data
    const response = await fetch(
      `https://userinfobackend-of4s.onrender.com/api/user/deleteInfo/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(),
      }
    );
    const json = response.json();
    // console.log("deleting the note with id" + id);
    const newdata = data.filter((data) => {
      return data._id !== id;
    });
    setdata(newdata);
  };
  // let x = data ? data.length : 0;
  return (
    <>
      <div className="p-4">
        <div className="container">
          <div className="row mb-3 bg-body-secondary border border-secondary rounded-lg py-3">
            <div className="col fw-bold">S.No</div>
            <div className="col fw-bold">Name</div>
            <div className="col fw-bold">Email</div>
            <div className="col fw-bold">Gender</div>
            <div className="col fw-bold">City</div>
            <div className="col fw-bold">Phone</div>
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add &#xFF0B;
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add User
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="container mb-2">
                      <Adduser showAlert={showAlert} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data.length==0?<h2>No users</h2>:data.length > 0 &&
            data.map((user, index) => (
              <div className="row mb-2 bg-body-secondary border border-secondary rounded-lg py-2" key={user._id}>
                <div className="col">{index + 1}</div>
                <div className="col">{user.name}</div>
                <div className="col">{user.email}</div>
                <div className="col">{user.gender}</div>
                <div className="col">{user.city}</div>
                <div className="col">{user.phone}</div>
                <div className="col d-flex">
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <img src={view} className="img-fluid" alt="View"></img>
                  </button>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            User Info
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="container">
                          <Card showAlert={showAlert} name={user.name} gender={user.gender} email={user.email} city={user.city} phone={user.phone}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn"
                    onClick={() => {
                      deletenote(user._id);
                      props.showAlert("Deleted successfully", "success");
                    }}
                  >
                    <img src={del} className="img-fluid" alt="Delete"></img>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Createuser;
