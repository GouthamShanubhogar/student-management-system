import React from 'react';
import { StudentProvider } from './context/StudentContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Card from './components/ui/card';
import AddStudent from './components/AddStudent';
import AttendancePage from './pages/AttendancePage';
import ResultsPage from './pages/ResultsPage';
import AssignmentsPage from './pages/AssignmentsPage';

// HomePage component as before
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-10 drop-shadow-lg">
        Student Management Dashboard
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card onClick={() => navigate('/attendance')}>
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-2">📝</span>
            <h2 className="text-2xl font-semibold text-blue-700">Take Attendance</h2>
            <p className="text-gray-600 mt-2">Mark student attendance with visual boxes</p>
          </div>
        </Card>
        <Card onClick={() => navigate('/results')}>
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-2">📊</span>
            <h2 className="text-2xl font-semibold text-green-700">Results</h2>
            <p className="text-gray-600 mt-2">Upload or view student marks</p>
          </div>
        </Card>
        <Card onClick={() => navigate('/assignments')}>
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-2">📚</span>
            <h2 className="text-2xl font-semibold text-purple-700">Assignments</h2>
            <p className="text-gray-600 mt-2">Manage assignment uploads and tracking</p>
          </div>
        </Card>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Student</h2>
        <AddStudent
          onAdd={() => window.location.reload()}
          editingStudent={null}
          setEditingStudent={() => {}}
        />
      </div>
    </div>
  );
};

// App component with routing

function App() {
  return (
    <StudentProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
      </Routes>
    </StudentProvider>
  );
}

export default App;