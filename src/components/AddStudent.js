import React, { useState, useEffect } from 'react';
import axios from 'axios';

function formatDateForInput(dateString) {
  if (!dateString) return '';

  // If it's in full ISO format, e.g., '2025-07-09T00:00:00.000Z'
  if (dateString.includes('T')) {
    return dateString.split('T')[0]; // returns '2025-07-09'
  }

  // If it's already a plain date (from PostgreSQL or local state)
  return dateString;
}

const AddStudent = ({ onAdd, editingStudent, setEditingStudent }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    department: '',
    dob: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent({
        ...editingStudent,
        dob: formatDateForInput(editingStudent.dob), // avoid timezone issue
      });
    }
  }, [editingStudent]);


  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 VALIDATION START
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const today = new Date();
    const dobDate = new Date(student.dob);

    if (!student.name.trim() || !nameRegex.test(student.name)) {
      alert('Please enter a valid name (only letters and spaces).');
      return;
    }

    if (!emailRegex.test(student.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!student.department.trim()) {
      alert('Department is required.');
      return;
    }

    if (!student.dob || dobDate > today) {
      alert('Please select a valid date of birth (not in the future).');
      return;
    }
    // 🔒 VALIDATION END

    try {
      if (editingStudent) {
        await axios.put(`http://localhost:3000/api/students/${editingStudent.id}`, student);
        alert('Student updated successfully!');
        setEditingStudent(null);
      } else {
        await axios.post('http://localhost:3000/api/students', student);
        alert('Student added successfully!');
      }

      setStudent({ name: '', email: '', department: '', dob: '' });
      onAdd(); // Refresh the list
    } catch (err) {
      alert('Error saving student');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={student.department}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dob"
        value={formatDateForInput(student.dob)}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {editingStudent ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default AddStudent;
