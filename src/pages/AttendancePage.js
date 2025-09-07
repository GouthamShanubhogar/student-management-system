import axios from 'axios';

import React, { useState } from 'react';
import { useStudents } from '../context/StudentContext';

function AttendancePage() {
  const { students } = useStudents();
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [showBoxes, setShowBoxes] = useState(false);

  // When students list changes, set all to present by default
  React.useEffect(() => {
    if (students && students.length > 0) {
      setAttendance((prev) => {
        // Only set if not already set (preserve user changes)
        const newAttendance = { ...prev };
        students.forEach(s => {
          if (!(s.id in newAttendance)) newAttendance[s.id] = 'present';
        });
        return newAttendance;
      });
    }
  }, [students]);

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === 'absent' ? 'present' : 'absent'
    }));
  };

  const saveAttendance = async () => {
    if (!date) {
      alert('Please select a date before saving attendance.');
      return;
    }
    try {
      const data = {
        date,
        attendance: Object.entries(attendance).map(([id, status]) => ({
          student_id: id,
          status: status === 'present' ? 'Present' : status === 'absent' ? 'Absent' : null
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-2">
      <div className="w-full bg-white shadow-lg p-4 md:p-6 lg:p-8">
  <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 md:mb-6 text-center drop-shadow">Take Attendance</h2>
  <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={() => setShowBoxes(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
          >
            Take Attendance
          </button>
        </div>
        {showBoxes && (
          <>
            <div className="mt-2 md:mt-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                {students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => toggleAttendance(student.id)}
                    className={`flex items-center justify-center px-4 py-6 rounded-lg cursor-pointer border font-medium text-base transition-all duration-200 select-none shadow group w-full
                      ${attendance[student.id] === 'present'
                        ? 'bg-green-100 border-green-400 text-green-900 hover:bg-green-200'
                        : attendance[student.id] === 'absent'
                        ? 'bg-red-100 border-red-400 text-red-900 hover:bg-red-200'
                        : 'bg-gray-50 border-gray-300 hover:bg-blue-50'}
                    `}
                    title={student.name}
                  >
                    <span className="text-center font-semibold w-full" title={student.name}>{student.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-4 md:gap-8 text-base md:text-lg">
              <span className="flex items-center gap-2 text-green-700 font-semibold">
                <span className="text-2xl">✅</span> Present: {totalPresent}
              </span>
              <span className="flex items-center gap-2 text-red-700 font-semibold">
                <span className="text-2xl">❌</span> Absent: {totalAbsent}
              </span>
            </div>
            <div className="flex justify-center mt-6 md:mt-8">
              <button
                onClick={saveAttendance}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg text-lg"
              >
                Save Attendance
              </button>
            </div>
          </>
        )}

      </div>
      {/* Attendance history section */}
  <div className="mt-4 md:mt-8 w-full flex flex-col items-center">
        <div className="w-full">
          {/* AttendanceHistory component */}
          {React.createElement(require('../components/AttendanceHistory').default)}
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
