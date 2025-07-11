import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceForm = ({ onAttendanceSubmitted }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/students')
      .then(res => setStudents(res.data));
  }, []);

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 10);

    for (const studentId in attendance) {
      await axios.post('http://localhost:3000/api/attendance', {
        student_id: studentId,
        status: attendance[studentId],
        date,
      });
    }

    alert('Attendance submitted!');
    onAttendanceSubmitted();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mark Attendance</h2>
      {students.map(student => (
        <div key={student.id}>
          <span>{student.name}</span>
          <select onChange={(e) => handleStatusChange(student.id, e.target.value)}>
            <option value="">--Select--</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      ))}
      <button type="submit">Submit Attendance</button>
    </form>
  );
};

export default AttendanceForm;
