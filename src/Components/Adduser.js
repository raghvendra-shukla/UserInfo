import { useState } from "react";
import React from 'react';


function Adduser(props) {
    const [users, setusers] = useState([]);
    const [user, setuser] = useState({name:"",email:"",gender:"",city:"",phone:""});
    const adduser= async(name,email,gender,city,phone)=>{
        //API call
        
        const response = await fetch("https://userinfobackend-of4s.onrender.com/api/user/addInfo", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({name,email,gender,city,phone})
        });
        const prof= await response.json();
        // console.log(prof);
        setusers(users.concat(prof));
      }
    const handleonchange=(e)=>{ 
        setuser({...user,[e.target.name]:e.target.value})
    }
    const handleonclick=(e)=>{
        e.preventDefault();
        adduser(user.name,user.email,user.gender,user.city,user.phone)
        setuser({name:"",email:"",gender:"",city:"",phone:""})
        props.showAlert("user has been added successfully","success");
    }
  return (
    <div>
  <h1>Hello!</h1>
  <form>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" minLength={2} required value={user.name} onChange={handleonchange} placeholder="Enter your name"/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" className="form-control" id="email" name="email" minLength={5} required value={user.email} onChange={handleonchange} placeholder="Enter your email"/>
    </div>
    <div className="mb-3">
      <label htmlFor="phone" className="form-label">Phone</label>
      <input type="text" className="form-control" id="phone" name="phone" minLength={5} required value={user.phone} onChange={handleonchange} placeholder="Enter your phone number"/>
    </div>
    <div className="mb-3">
      <label htmlFor="gender" className="form-label">Gender</label>
      <input type="text" className="form-control" id="gender" name="gender" minLength={5} required value={user.gender} onChange={handleonchange} placeholder="Enter your gender"/>
    </div>
    <div className="mb-3">
      <label htmlFor="city" className="form-label">City</label>
      <input type="text" className="form-control" id="city" name="city" minLength={5} required value={user.city} onChange={handleonchange} placeholder="Enter your city"/>
    </div>
    <button disabled={user.name.length<3|| user.email.length<3|| user.phone.length<3|| user.gender.length<3|| user.city.length<3} type="submit" className="btn btn-primary" onClick={handleonclick}>Add user</button>
  </form>
</div>
  )
}

export default Adduser