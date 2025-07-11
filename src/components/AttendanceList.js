import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/attendance')
      .then(res => setRecords(res.data));
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, idx) => (
            <tr key={idx}>
              <td>{record.name}</td>
              <td>{record.date}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
