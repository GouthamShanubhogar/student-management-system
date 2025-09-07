
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceHistory = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentMap, setStudentMap] = useState({});
  // Fetch all students for mapping IDs to names
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/students');
        const map = {};
        res.data.forEach(s => { map[s.id] = s.name; });
        setStudentMap(map);
      } catch (err) {
        setStudentMap({});
      }
    };
    fetchStudents();
  }, []);

  // Fetch all unique attendance dates
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/attendance/dates');
        setDates(res.data);
      } catch (err) {
        setDates([]);
      }
    };
    fetchDates();
  }, []);

  // Fetch attendance for selected date
  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    axios.get(`http://localhost:3000/api/attendance/by-date/${selectedDate}`)
      .then(res => setAttendance(res.data))
      .catch(() => setAttendance([]))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  return (
  <div className="bg-white rounded-xl shadow p-2 md:p-3 mt-2 md:mt-4 w-full max-w-3xl mx-auto">
  <h2 className="text-lg md:text-xl font-bold text-blue-700 mb-1 md:mb-2">Attendance History</h2>
  <div className="mb-1 md:mb-2">
        <label className="font-medium mr-2">Select Date:</label>
        <select
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">-- Select Date --</option>
          {dates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : selectedDate && (
        attendance.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No records found.</div>
        ) : (
          <div className="w-full flex flex-col gap-8 px-0 md:px-0">
            {/* Present Students Grid */}
            <div>
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                <span className="text-xl">✅</span> Present Students
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full px-0 md:px-0">
                {attendance.filter(a => a.status === 'Present').length === 0 ? (
                  <div className="text-gray-400 italic text-center col-span-full">No present students.</div>
                ) : (
                  attendance.filter(a => a.status === 'Present').map((a, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center px-4 py-6 rounded-lg border font-medium text-base transition-all duration-200 select-none shadow w-full bg-green-100 border-green-400 text-green-900"
                      title={studentMap[a.student_id] || a.student_id}
                    >
                      <span className="text-center font-semibold w-full" title={studentMap[a.student_id] || a.student_id}>{studentMap[a.student_id] || a.student_id}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Absent Students Grid */}
            <div>
              <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                <span className="text-xl">❌</span> Absent Students
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full px-0 md:px-0">
                {attendance.filter(a => a.status === 'Absent').length === 0 ? (
                  <div className="text-gray-400 italic text-center col-span-full">No absent students.</div>
                ) : (
                  attendance.filter(a => a.status === 'Absent').map((a, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center px-4 py-6 rounded-lg border font-medium text-base transition-all duration-200 select-none shadow w-full bg-red-100 border-red-400 text-red-900"
                      title={studentMap[a.student_id] || a.student_id}
                    >
                      <span className="text-center font-semibold w-full" title={studentMap[a.student_id] || a.student_id}>{studentMap[a.student_id] || a.student_id}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AttendanceHistory;
