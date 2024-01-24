import CubeIcon from '../Assets/cube.png';
import UserProfileIcon from '../Assets/userprofile.png';
import ActivityIcon from '../Assets/activity.png';
import PasswordIcon from '../Assets/pwd.png';
import passwordIcon from '../Assets/password.png';
import SearchIcon from '../Assets/search.png'; 
import UploadPicture from '../Assets/upload.png'; 
import Usersetupprofile from './Usersetupprofile'; 
import './AddUserModal.css';
import './Admin.css';
import React, { useState, useEffect } from 'react';
import person_ic from '../Assets/person.png';
import cal_ic from '../Assets/cal.png';
import select_cal_icon from '../Assets/date.png';
import location_icon from '../Assets/location.png';
import arrow_down_icon from '../Assets/arrow-down.png';
import arrow_up_icon from '../Assets/arrow-up.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import gender from '../Assets/gender.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUserModal = () => {
  const navigate= useNavigate();

  const [fullName, setFullName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [zIndexGender, setZIndexGender] = useState(1);
  const [zIndexLocation, setZIndexLocation] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [username, setUsername] = useState('');
      
    return (
        <div className='Ex'>
            Hello </div>
             );
            }
            export default AddUserModal;