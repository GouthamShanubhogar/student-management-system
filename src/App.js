import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './components/ui/card';
import AddStudent from './components/AddStudent';



const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
        Student Management Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
        <Card className="p-6 shadow-lg text-center hover:bg-blue-100 cursor-pointer transition" onClick={() => navigate('/attendance')}>
          <h2 className="text-2xl font-semibold text-blue-700">Take Attendance</h2>
          <p className="text-gray-600 mt-2">Mark student attendance with visual boxes</p>
        </Card>

        <Card className="p-6 shadow-lg text-center hover:bg-green-100 cursor-pointer transition" onClick={() => navigate('/results')}>
          <h2 className="text-2xl font-semibold text-green-700">Results</h2>
          <p className="text-gray-600 mt-2">Upload or view student marks</p>
        </Card>

        <Card className="p-6 shadow-lg text-center hover:bg-purple-100 cursor-pointer transition" onClick={() => navigate('/assignments')}>
          <h2 className="text-2xl font-semibold text-purple-700">Assignments</h2>
          <p className="text-gray-600 mt-2">Manage assignment uploads and tracking</p>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Student</h2>
        <AddStudent onAdd={() => window.location.reload()} editingStudent={null} setEditingStudent={() => {}} />
      </div>
    </div>
  );
};

export default HomePage;
