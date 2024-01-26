import React, { useState } from 'react';
import Registration from './Components/UMS/Registration';
import Signin from './Components/UMS/Signin';
import Forgetpassword from './Components/UMS/Forgetpassword';
import Resetpassword from './Components/UMS/Resetpassword';
import Usersetupprofile from './Components/UMS/Usersetupprofile';
import Admin from './Components/UMS/Admin';
import Wrongpassword from './Components/UMS/Wrongpassword';
import Adduser from './Components/UMS/Adduser';

import Userdata from './Components/UMS/Userdata';
import User from './Components/UMS/User';

// import Wrongpassword from './Components/UMS/Wrongpassword';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Registration/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>

      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/usersetupprofile" element={<Usersetupprofile/>}></Route>
      <Route path="/forgetpassword" element={<Forgetpassword/>}></Route>

      <Route path="/resetpassword" element={<Resetpassword/>}></Route>
      <Route path="/admin" element={<Admin/>}></Route>
      <Route path="/wrongpassword" element={<Wrongpassword/>}></Route>
      <Route path="/adduser" element={<Adduser/>}></Route>
      <Route path="/userdata" element={<Userdata />}>  </Route>
      <Route path="/user" element={<User />}>  </Route>

    </Routes>
  );
}


export default App;