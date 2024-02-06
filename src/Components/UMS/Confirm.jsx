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
      <div className='confirm-txts change-username-txt'>Change username</div>
      <div className='confirm-input change-username-input'>
        <img src={personIcon} alt='' />
        <input type='text' />
      </div>
      <button className="confirm-save-button" onClick={() => alert('Save button clicked!')}>
        Save
      </button>
    </div>
  );
}

export default Confirm;
