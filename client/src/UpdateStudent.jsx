import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: '',
        english: '',
        tamil: '',
        englishLit: '',
        sinhala: '',
        art: '',
        ict: '',
        science: '',
        healthScience: '',
        maths: ''
    });
   
    useEffect(() => {
        axios.get(`http://localhost:3004/teacher-operations/students/${id}`)
            .then(response => {
                console.log(response.data); // Log fetched student data
                if (response.data) {
                    setStudent(response.data);
                }
            })
            .catch(error => console.error('Error fetching student profile:', error));
    }, [id]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3004/teacher-operations/students/${id}`, student)
            .then(response => {
                alert('Student profile updated successfully');
                navigate('/teacher-dashboard');
            })
            .catch(error => console.error('Error updating student profile:', error));
    };

    return (
        <div className="container mt-4">
            <h2>Update Student</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={student.firstName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={student.lastName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={student.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="profilePicture"
                        name="profilePicture"
                        value={student.profilePicture || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="english" className="form-label">English</label>
                        <input
                            type="number"
                            className="form-control"
                            id="english"
                            name="english"
                            value={student.english || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="tamil" className="form-label">Tamil</label>
                        <input
                            type="number"
                            className="form-control"
                            id="tamil"
                            name="tamil"
                            value={student.tamil || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="englishLit" className="form-label">English Literature</label>
                        <input
                            type="number"
                            className="form-control"
                            id="englishLit"
                            name="englishLit"
                            value={student.englishLit || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="sinhala" className="form-label">Sinhala</label>
                        <input
                            type="number"
                            className="form-control"
                            id="sinhala"
                            name="sinhala"
                            value={student.sinhala || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="art" className="form-label">Art</label>
                        <input
                            type="number"
                            className="form-control"
                            id="art"
                            name="art"
                            value={student.art || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="ict" className="form-label">ICT</label>
                        <input
                            type="number"
                            className="form-control"
                            id="ict"
                            name="ict"
                            value={student.ict || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="science" className="form-label">Science</label>
                        <input
                            type="number"
                            className="form-control"
                            id="science"
                            name="science"
                            value={student.science || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="healthScience" className="form-label">Health Science</label>
                        <input
                            type="number"
                            className="form-control"
                            id="healthScience"
                            name="healthScience"
                            value={student.healthScience || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="maths" className="form-label">Maths</label>
                        <input
                            type="number"
                            className="form-control"
                            id="maths"
                            name="maths"
                            value={student.maths || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default UpdateStudent;
