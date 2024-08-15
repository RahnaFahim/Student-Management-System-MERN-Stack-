import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
    // Initialize students state
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    // Fetch student profiles when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3004/teacher-operations/students')
            .then(response => {
                console.log('Fetched students:', response.data);
                // Check if response.data is an array and set state accordingly
                if (Array.isArray(response.data)) {
                    setStudents(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setStudents([]); // Reset to empty array if data format is incorrect
                }
            })
            .catch(error => console.error('Error fetching student profiles:', error));
    }, []);

    const handleUpdate = (id) => {
        navigate(`/update-student/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3004/teacher-operations/students/${id}`)
            .then(response => {
                setStudents(students.filter(student => student._id !== id));
                alert('Student profile deleted successfully');
            })
            .catch(error => console.error('Error deleting student profile:', error));
    };

    const handleLogout = () => {
        navigate('/login');
    };
    
    
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Teacher Dashboard</h2>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Details</th>
                        <th>Marks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <React.Fragment key={student._id}>
                            <tr>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`/uploads/${student.profilePicture}`}
                                            alt="Profile"
                                            className="rounded-circle me-3"
                                            width="50"
                                        />
                                        <div>
                                            <div><strong>First Name:</strong> {student.firstName}</div>
                                            <div><strong>Last Name:</strong> {student.lastName}</div>
                                            <div><strong>Email:</strong> {student.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div><strong>English:</strong> {student.english}</div>
                                        <div><strong>Tamil:</strong> {student.tamil}</div>
                                        <div><strong>English Lit:</strong> {student.englishLit}</div>
                                        <div><strong>Sinhala:</strong> {student.sinhala}</div>
                                        <div><strong>Art:</strong> {student.art}</div>
                                        <div><strong>ICT:</strong> {student.ict}</div>
                                        <div><strong>Science:</strong> {student.science}</div>
                                        <div><strong>Health Science:</strong> {student.healthScience}</div>
                                        <div><strong>Maths:</strong> {student.maths}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-warning" onClick={() => handleUpdate(student._id)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherDashboard;
