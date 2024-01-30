import React, { useState } from 'react'
import Header from './Header';

const Activity = () => {
    const [activityData, setActivityData] = useState([]);
    const initialActivityData = [
        { id: 1, username: 'Unknown', date: '2024-01-19', activity: 'Logged in' },
        { id: 2, username: 'uk1', date: '2024-01-18', activity: 'Changed picture' },
      ];
  return (
    <div>
        <div>
        <Header />
        </div>
<h1>Robeeeeera</h1>
  <table className="ad-activity-table" style={{marginTop:'100px'}}>
    <thead>
      <tr>
        <th>Username</th>
        <th>Date</th>
        <th>Activity</th>
      </tr>
    </thead>
    <tbody>
      {activityData.map((activity) =>(
        <tr key={activity.id}>
          <td>{activity.username}</td>
          <td>{activity.date}</td>
          <td>{activity.activity}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  )
}

export default Activity
