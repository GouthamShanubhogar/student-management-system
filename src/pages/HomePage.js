import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Welcome to Student Management System</h1>
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/attendance')} style={btnStyle}>Take Attendance</button>
        <button onClick={() => navigate('/results')} style={btnStyle}>Results</button>
        <button onClick={() => navigate('/assignments')} style={btnStyle}>Assignments</button>
      </div>
    </div>
  );
};

const btnStyle = {
  margin: '10px',
  padding: '15px 30px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default HomePage;
