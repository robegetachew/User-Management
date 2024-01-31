import React, { useState } from 'react';
import Registration from './Components/UMS/Registration';
import Signin from './Components/UMS/Signin';
import Forgetpassword from './Components/UMS/Forgetpassword';
import Resetpassword from './Components/UMS/Resetpassword';
import Usersetupprofile from './Components/UMS/Usersetupprofile';
import Admin from './Components/UMS/Admin'
import Wrongpassword from './Components/UMS/Wrongpassword';
import Adduser from './Components/UMS/Adduser';
import Profileview from './Components/UMS/Profileview';

import Header from './Components/UMS/Header';
import Userdata from './Components/UMS/Userdata';
import Users from './Components/UMS/Users';
import Userdash from './Components/UMS/Userdash';
import Userdashboard from './Components/UMS/Userdashboard';
import SideBar from './Components/UMS/SideBar';
import Myprofile from './Components/UMS/Myprofile';
import { UserProvider } from './UserContext';

import Activity from './Components/UMS/Activity';

// import Wrongpassword from './Components/UMS/Wrongpassword';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditUser from './Components/UMS/EditUser';


function App() {
  return (
    <Routes>
   

      <Route path="/" element={<Signin/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>

      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/usersetupprofile" element={<Usersetupprofile/>}></Route>
      <Route path="/forgetpassword" element={<Forgetpassword/>}></Route>
      <Route path="/profileview" element={<Profileview/>}></Route>
      <Route path="/resetpassword" element={<Resetpassword/>}></Route>
      <Route path="/wrongpassword" element={<Wrongpassword/>}></Route>
      <Route path="/adduser" element={<Adduser/>}></Route>
      <Route path="/userdata" element={<Userdata />}>  </Route>
      <Route path="/useractivity" element={<Activity />}>  </Route>
      <Route path="/edituser" element={<EditUser />}>  </Route>
      <Route path="/header" element={<Header />}>  </Route>
      <Route path="/users" element={<Users />}>  </Route>
      <Route path="/userdash" element={<Userdash />}>  </Route>
      <Route path="/Userdashboard" element={<Userdashboard />}>  </Route>
      <Route path="/SideBar" element={<SideBar />}>  </Route>
      <Route path="/Myprofile" element={<Myprofile />}>  </Route>
      <Route path="/Admin" element={<Admin/>}></Route>

    </Routes>
  );
}


export default App;