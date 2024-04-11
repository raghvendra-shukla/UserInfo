import './App.css';
import {
  BrowserRouter as Router,Routes,Route,
} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from './Components/Home';
import Alert from "./Components/Alert";
import { useState } from 'react';
import { Error } from './Components/Error';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    // setTimeout(() => {
    //   showAlert(null)
    // }, 1500);
  }
  return (
    <>
    <Router>
      <Alert alert={alert}/>
      <Routes>
      <Route path="/" element={(!localStorage.getItem("token"))?<Signup showAlert={showAlert}/>:<Home showAlert={showAlert}/>}></Route>
      <Route path="/signup" element={(!localStorage.getItem("token"))?<Signup showAlert={showAlert}/>:<Home showAlert={showAlert}/>}></Route>
      <Route path="/login" element={(!localStorage.getItem("token"))?<Login showAlert={showAlert}/>:<Home showAlert={showAlert}/>}></Route>
      < Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
