import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [showBoxes, setShowBoxes] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/students');
        setStudents(res.data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, []);

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === 'present' ? 'absent' : 'present'
    }));
  };

  const saveAttendance = async () => {
    try {
      const data = {
        date,
        attendance: Object.entries(attendance).map(([id, status]) => ({
          student_id: id,
          status
        }))
      };

      await axios.post('http://localhost:3000/api/attendance/save', data);
      alert('Attendance saved!');
      setShowBoxes(false);
      setAttendance({});
    } catch (error) {
      console.error('Failed to save attendance', error);
    }
  };

  const totalPresent = Object.values(attendance).filter((s) => s === 'present').length;
  const totalAbsent = students.length - totalPresent;

  return (
    <div className="mt-6">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-2 py-1 rounded mr-2"
      />
      <button
        onClick={() => setShowBoxes(true)}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Take Attendance
      </button>

      {showBoxes && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => toggleAttendance(student.id)}
                className={`p-3 rounded cursor-pointer text-center border ${
                  attendance[student.id] === 'present'
                    ? 'bg-green-400 text-white'
                    : attendance[student.id] === 'absent'
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {student.name}
              </div>
            ))}
          </div>

          <div className="mt-4 text-gray-700">
            <p>✅ Present: {totalPresent}</p>
            <p>❌ Absent: {totalAbsent}</p>
          </div>

          <button
            onClick={saveAttendance}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Attendance
          </button>
        </>
      )}
    </div>
  );
}

export default Attendance;
