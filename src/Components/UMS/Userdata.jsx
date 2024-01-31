import React, { useEffect } from 'react';

const Userdata = ({ userData }) => {
  useEffect(() => {
    console.log('Received userData:', userData);
  }, [userData]);

  return (
    <div>
      <h1>User Information</h1>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Name: {userData.username}</p>
          {/* Display other user information as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Userdata;

// import React, { useEffect } from 'react';
// import Signin from './Signin';

// const Userdata = ({ userData }) => {
//   useEffect(() => {
//     console.log('Received userData:', userData);
//   }, [userData]);

//   return (
//     <div>
//       <h1>User Information</h1>
//       {userData ? (
//         <div>
//           <p>Email: {userData.email}</p>
//           <p>Name: {userData.name}</p>
//           {/* Display other user information as needed */}
//         </div>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default Userdata;
