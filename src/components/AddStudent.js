import React, { useState, useEffect } from "react";
import { useStudents } from '../context/StudentContext';

const AddStudent = ({ editingStudent, setEditingStudent }) => {
  const { addStudentAndRefresh } = useStudents();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!student.name || !student.email || !student.age || !student.gender) {
      alert("Please fill in all required fields.");
      return;
    }
    await addStudentAndRefresh(student);
    setStudent({ name: "", email: "", age: "", gender: "", phone: "", address: "" });
    setEditingStudent && setEditingStudent(null);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Name<span className="text-red-500">*</span></label>
        <input
          type="text"
          placeholder="Full Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
        <input
          type="email"
          placeholder="Email Address"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Age<span className="text-red-500">*</span></label>
        <input
          type="number"
          placeholder="Age"
          value={student.age}
          onChange={(e) => setStudent({ ...student, age: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          min="1"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Gender<span className="text-red-500">*</span></label>
        <select
          value={student.gender}
          onChange={(e) => setStudent({ ...student, gender: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="flex flex-col md:col-span-2">
        <label className="mb-1 font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={student.phone}
          onChange={(e) => setStudent({ ...student, phone: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div className="flex flex-col md:col-span-2">
        <label className="mb-1 font-medium text-gray-700">Address</label>
        <textarea
          placeholder="Address"
          value={student.address}
          onChange={(e) => setStudent({ ...student, address: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          rows={2}
        />
      </div>
      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </div>
    </form>
  );
};

export default AddStudent;
