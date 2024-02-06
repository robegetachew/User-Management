// import React, { useState } from 'react';
// import { useUser } from '../../UserContext';

// const Updateprofile = () => {
//   const { updateProfilePicture } = useUser();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     gender: '',
//     phone: '',
//     dob: '',
//     password: '',
//     username: '',
//     location: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     // Save the changes, then update the profile picture
//     updateProfilePicture(/* new profile picture path */);
//   };


//   return (
//     <div className="profile-box">
//       <h2>Update Profile</h2>
//       <form>
//         <label>
//           Full Name
//           <input type="text" name="fullName" onChange={handleChange} />
//         </label>
//         {/* Add other input fields similarly */}
//         <button type="button" onClick={handleSave}>Save</button>
//       </form>
//     </div>
//   );
// };

// export default Updateprofile;
