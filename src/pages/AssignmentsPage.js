import React from 'react';

const AssignmentsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-6 drop-shadow">Assignments</h2>
        <span className="text-6xl mb-4">📚</span>
        <p className="text-lg text-gray-700 text-center">This is where you can manage assignments in the future.</p>
      </div>
    </div>
  );
};

export default AssignmentsPage;
