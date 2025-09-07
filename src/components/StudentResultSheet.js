

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const StudentResultSheet = ({ student, results, summary }) => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${student.name}_ResultSheet`,
    removeAfterPrint: true,
    onAfterPrint: () => alert('To save as PDF, select "Save as PDF" in the print dialog.'),
  });

  if (!results || !results.length || !summary) {
    return <div className="text-center text-gray-400 italic my-4">There is nothing to print</div>;
  }
  return (
    <>
      <div ref={componentRef} className="bg-white border border-gray-200 rounded-xl shadow p-6 mb-8 w-full max-w-2xl mx-auto print:bg-white">
        <div className="font-bold text-2xl text-blue-800 mb-2 text-center">Result Sheet</div>
        <div className="mb-4 text-center">
          <span className="font-semibold">Name:</span> {student.name} &nbsp;|&nbsp;
          <span className="font-semibold">ID:</span> {student.id}
        </div>
        <table className="min-w-full mb-4 border">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 border">Course Code</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Marks</th>
              <th className="py-2 px-4 border">Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => {
              const [code, name] = r.subject.split(': ');
              return (
                <tr key={idx}>
                  <td className="py-2 px-4 border">{code}</td>
                  <td className="py-2 px-4 border">{name}</td>
                  <td className="py-2 px-4 border">{r.marks}</td>
                  <td className="py-2 px-4 border">{r.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-wrap gap-6 justify-center text-lg">
          <div><b>Total Marks:</b> {summary.total} / 900</div>
          <div><b>Percentage:</b> {summary.percentage}%</div>
          <div><b>SGPA:</b> {summary.sgpa}</div>
          <div><b>Grade:</b> {summary.grade}</div>
        </div>
      </div>
      <div className="flex flex-col items-end mt-4 w-full max-w-2xl mx-auto">
        <span className="text-xs text-gray-500 mb-1">To download as PDF, click the button and select "Save as PDF" in the print dialog.</span>
        <button
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          Print / Download PDF
        </button>
      </div>
    </>
  );
};

export default StudentResultSheet;
