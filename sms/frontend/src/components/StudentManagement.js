import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the API URL
// const API_URL = 'http://127.0.0.1:8000/api/students/';

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({std_id:null ,first_name: '',last_name: '',email: '',phone:null,date_of_birth: '',create_at:''});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students/'); // Use API_URL here
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/students/', formData); // Use API_URL here
      fetchStudents();
      setFormData({std_id:'' , first_name: '', last_name: '', email: '',phone:'', date_of_birth: '',create_at:'' });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${'http://127.0.0.1:8000/api/students/'}${id}/`); // Use API_URL here
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="number"
          placeholder="number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="create_at"
          value={formData.create_at}
          onChange={handleChange}
          required
        />
        <button  type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
           {student.std_id} {student.first_name} {student.last_name} - {student.email} - {student.phone} - {student.date_of_birth} - {student.create_at}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentManagement;
