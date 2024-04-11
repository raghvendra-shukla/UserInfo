import React from 'react';

function Section(props) {
    const {name,email,phone,gender,city}=props;
    
  return (
    <>
    <div className="card my-2">
  <div className="card-body">
    <h5 className="card-title">User Info</h5>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Name : {name}</li>
    <li className="list-group-item">Email : {email}</li>
    <li className="list-group-item">Phone :{phone}</li>
    <li className="list-group-item">Gender :{gender}</li>
    <li className="list-group-item">City :{city}</li>
  </ul>
  </div>
    </>
  )
}


export default Section