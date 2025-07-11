import React from 'react';
import axios from 'axios';

const StudentList = ({ students, onEdit, onDelete }) => {
  // Delete student by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      onDelete(); // Refresh list in App.js
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student.");
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.dob?.slice(0, 10)}</td>
                <td>
                  <button onClick={() => onEdit(student)}>Edit</button>{' '}
                  <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
