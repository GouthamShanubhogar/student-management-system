import React from 'react';

const ResultsTable = ({ results }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border rounded-xl shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border-b">Student</th>
            <th className="py-2 px-4 border-b">Subject</th>
            <th className="py-2 px-4 border-b">Marks</th>
            <th className="py-2 px-4 border-b">Grade</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">No results found.</td>
            </tr>
          ) : (
            results.map((r) => (
              <tr key={r.id} className="hover:bg-blue-50">
                <td className="py-2 px-4 border-b">{r.student_name || r.student_id}</td>
                <td className="py-2 px-4 border-b">{r.subject}</td>
                <td className="py-2 px-4 border-b">{r.marks}</td>
                <td className="py-2 px-4 border-b">{r.grade}</td>
                <td className="py-2 px-4 border-b">{r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
