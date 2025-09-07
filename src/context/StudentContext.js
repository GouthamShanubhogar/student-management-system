import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const StudentContext = createContext();

export function useStudents() {
  return useContext(StudentContext);
}

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/students');
      const sorted = res.data.slice().sort((a, b) => a.name.localeCompare(b.name));
      setStudents(sorted);
    } catch (err) {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Call this after adding a student
  const addStudentAndRefresh = async (studentData) => {
    await axios.post('http://localhost:3000/api/students', studentData);
    await fetchStudents();
  };

  return (
    <StudentContext.Provider value={{ students, loading, fetchStudents, addStudentAndRefresh }}>
      {children}
    </StudentContext.Provider>
  );
}
