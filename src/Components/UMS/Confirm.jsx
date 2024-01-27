import React from 'react';
import './Confirm.css'; 
import passwordIcon from '../Assets/password.png';
import personIcon from '../Assets/person.png';


const Confirm = () => {
  return (
      <div className="confirm-inputs">
        <div className="confirm-txts">New Password</div>
        <div className="confirm-input">
          <img src={passwordIcon} alt="" />
          <input type="password" />
        </div>
        <div className="confirm-txts">Confirm Password</div>
        <div className="confirm-input">
          <img src={passwordIcon} alt="" />
          <input type="password" />
        </div>

   </div>
  );
}

export default Confirm;
