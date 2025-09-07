import React, { useState, useEffect } from 'react';
import axios from 'axios';


const theorySubjects = [
  { code: '24MCAT201', name: 'Database Management Systems' },
  { code: '24MCAT202', name: 'Object Oriented Programming using Java' },
  { code: '24MCAT203', name: 'Software Engineering' },
  { code: '24MCAT204', name: 'Mobile Application Development' },
  { code: '24MCAT205', name: 'Design and Analysis of Algorithm' },
  { code: '24MCAT206', name: 'Cloud Computing' },
];
const labSubjects = [
  { code: '24MCAL207', name: 'DBMS Laboratory' },
  { code: '24MCAL208', name: 'Object Oriented Programming using Java Laboratory' },
  { code: '24MCAL209', name: 'Mobile Application Development Laboratory' },
];

const initialMarks = {};
theorySubjects.forEach(sub => { initialMarks[sub.code] = ''; });
labSubjects.forEach(sub => { initialMarks[sub.code] = ''; });

const ResultUploadForm = ({ students, onResultUploaded }) => {
  const [studentId, setStudentId] = useState('');
  const [marks, setMarks] = useState({ ...initialMarks });
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleMarksChange = (code, value) => {
    setMarks({ ...marks, [code]: value });
  };

  const calculateSummary = () => {
    const allMarks = [...theorySubjects, ...labSubjects].map(sub => Number(marks[sub.code]) || 0);
    const total = allMarks.reduce((a, b) => a + b, 0);
    const percentage = allMarks.length ? (total / (allMarks.length * 100)) * 100 : 0;
    // Simple CGPA calculation: scale percentage to 10
  let cgpa = percentage / 9.5;
  cgpa = Math.min(cgpa, 10);
    let grade = '';
    if (percentage >= 90) grade = 'O';
    else if (percentage >= 80) grade = 'A+';
    else if (percentage >= 70) grade = 'A';
    else if (percentage >= 60) grade = 'B+';
    else if (percentage >= 50) grade = 'B';
    else if (percentage >= 40) grade = 'C';
    else grade = 'F';
    return { total, percentage: percentage.toFixed(2), cgpa: cgpa.toFixed(2), grade };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      alert('Please select a student.');
      return;
    }
    // Check all fields filled
    for (const sub of [...theorySubjects, ...labSubjects]) {
      if (!marks[sub.code]) {
        alert(`Please enter marks for ${sub.code}: ${sub.name}`);
        return;
      }
    }
    const summaryData = calculateSummary();
    setSummary(summaryData);
    setLoading(true);
    try {
      // Save each subject result
      for (const sub of [...theorySubjects, ...labSubjects]) {
        await axios.post('http://localhost:3000/api/results', {
          student_id: studentId,
          subject: `${sub.code}: ${sub.name}`,
          marks: marks[sub.code],
          grade: summaryData.grade,
        });
      }
      // Optionally, save summary (CGPA, percentage) elsewhere
      setMarks({ ...initialMarks });
      setStudentId('');
      setSummary(null);
      onResultUploaded();
    } catch (err) {
      alert('Failed to upload result.');
    }
    setLoading(false);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setSummary(calculateSummary());
  };

  // Sort students alphabetically by name
  const sortedStudents = students.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <form onSubmit={handleSubmit} className="w-full mb-8">
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-medium text-gray-700">Student<span className="text-red-500">*</span></label>
        <select
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        >
          <option value="">Select Student</option>
          {sortedStudents.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {theorySubjects.map(sub => (
          <div className="flex flex-col" key={sub.code}>
            <label className="mb-1 font-medium text-gray-700">
              <span className="block text-sm text-gray-500">Course Code: <span className="font-semibold">{sub.code}</span></span>
              {sub.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={marks[sub.code]}
              onChange={e => handleMarksChange(sub.code, e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
        ))}
        {labSubjects.map(sub => (
          <div className="flex flex-col" key={sub.code}>
            <label className="mb-1 font-medium text-gray-700">
              <span className="block text-sm text-gray-500">Course Code: <span className="font-semibold">{sub.code}</span></span>
              {sub.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={marks[sub.code]}
              onChange={e => handleMarksChange(sub.code, e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-6 justify-end">
        <button
          type="button"
          onClick={handlePreview}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold shadow"
        >
          Preview CGPA & Grade
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Result'}
        </button>
      </div>
      {summary && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow text-lg">
          <div><b>Total Marks:</b> {summary.total} / 900</div>
          <div><b>Percentage:</b> {summary.percentage}%</div>
          <div><b>CGPA:</b> {summary.cgpa}</div>
          <div><b>Grade:</b> {summary.grade}</div>
        </div>
      )}
    </form>
  );
};

export default ResultUploadForm;
