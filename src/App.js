import './styles/App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import Attendance from './components/Attendance';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/students');
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Student Management System
      </h1>

      <AddStudent
        onAdd={fetchStudents}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />

      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={fetchStudents}
      />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Attendance</h2>
        <p className="text-gray-600 mb-4">
          Mark students as <strong>Present</strong> or <strong>Absent</strong>. Recent attendance records will be shown below.
        </p>

        <Attendance />
      </section>
    </div>
  );
}

export default App;
