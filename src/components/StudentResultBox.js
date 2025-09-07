import React from 'react';

const StudentResultBox = ({ student, summary }) => {
  if (!student || !summary) return null;
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl shadow p-4 mb-4 w-full max-w-2xl mx-auto">
      <div className="font-bold text-lg text-green-800 mb-2">{student.name} ({student.id})</div>
      <div className="flex flex-wrap gap-6">
        <div><b>Total Marks:</b> {summary.total} / 900</div>
        <div><b>Percentage:</b> {summary.percentage}%</div>
        <div><b>SGPA:</b> {summary.sgpa}</div>
        <div><b>Grade:</b> {summary.grade}</div>
      </div>
    </div>
  );
};

export default StudentResultBox;
