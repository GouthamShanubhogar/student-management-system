
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResultUploadForm from '../components/ResultUploadForm';
import ResultsTable from '../components/ResultsTable';
import StudentResultBox from '../components/StudentResultBox';
import StudentResultSheet from '../components/StudentResultSheet';
import { useStudents } from '../context/StudentContext';

const ResultsPage = () => {
  const { students } = useStudents();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentSummaries, setStudentSummaries] = useState([]);

  // Calculate summary for each student
  const calculateStudentSummaries = (students, results) => {
    return students.map(student => {
      const studentResults = results.filter(r => r.student_id === student.id);
      if (studentResults.length === 0) return null;
      const total = studentResults.reduce((sum, r) => sum + Number(r.marks), 0);
      const percentage = studentResults.length ? (total / (studentResults.length * 100)) * 100 : 0;
      let sgpa = percentage / 9.5;
      sgpa = Math.min(sgpa, 10);
      let grade = '';
      if (percentage >= 90) grade = 'O';
      else if (percentage >= 80) grade = 'A+';
      else if (percentage >= 70) grade = 'A';
      else if (percentage >= 60) grade = 'B+';
      else if (percentage >= 50) grade = 'B';
      else if (percentage >= 40) grade = 'C';
      else grade = 'F';
      return { student, summary: { total, percentage: percentage.toFixed(2), sgpa: sgpa.toFixed(2), grade } };
    }).filter(Boolean);
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const resultsRes = await axios.get('http://localhost:3000/api/results');
      setResults(resultsRes.data);
      setStudentSummaries(calculateStudentSummaries(students, resultsRes.data));
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, [students]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-6 drop-shadow">Results</h2>
        <ResultUploadForm students={students} onResultUploaded={fetchAll} />
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <>
            <ResultsTable results={results} />
            {/* Student summary boxes */}
            <div className="mt-8 w-full flex flex-col items-center">
              {studentSummaries.map(({ student, summary }) => {
                const studentResults = results.filter(r => r.student_id === student.id);
                if (!studentResults || !studentResults.length || !summary || !student) return null;
                // Only render if there is something to print
                return (
                  <div key={student.id} className="w-full">
                    <StudentResultBox student={student} summary={summary} />
                    <StudentResultSheet student={student} results={studentResults} summary={summary} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
