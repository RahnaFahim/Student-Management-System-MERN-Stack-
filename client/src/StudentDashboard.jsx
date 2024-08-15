import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [profile, setProfile] = useState({
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
        maths: '',
    });
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        // Fetch existing profile data on component mount
        axios.get('http://localhost:3004/api/student-profile') // path for StudentProfileRoutes 
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile data:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };
   
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Create FormData object for file upload
        const formData = new FormData();
        formData.append('firstName', profile.firstName);
        formData.append('lastName', profile.lastName);
        formData.append('email', profile.email);
        formData.append('english', profile.english);
        formData.append('tamil', profile.tamil);
        formData.append('englishLit', profile.englishLit);
        formData.append('sinhala', profile.sinhala);
        formData.append('art', profile.art);
        formData.append('ict', profile.ict);
        formData.append('science', profile.science);
        formData.append('healthScience', profile.healthScience);
        formData.append('maths', profile.maths);
        if (file) {
            formData.append('profilePicture', file);
        }

        axios.post('http://localhost:3004/api/student-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            setMessage('Profile updated successfully!');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/student-login');
        console.log('Logged out');
    };


    return (
        <div className="container-fluid vh-100 bg-white">
            <div className="d-flex justify-content-between align-items-center p-3">
                <h2>Student Dashboard</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            <div className="p-4">
                {message && <div className="alert alert-success">{message}</div>}
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">

                    <div className="mb-3">
                        <label htmlFor="profilePicture"><strong>Profile Picture</strong></label>
                        <input
                            type="file"
                            name="profilePicture"
                            className="form-control"
                            onChange={(e) => setProfile({ ...profile, profilePicture: e.target.files[0] })}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="firstName"><strong>First Name</strong></label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={profile.firstName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName"><strong>Last Name</strong></label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={profile.lastName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={profile.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <h4>Subject Marks</h4>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="english"><strong>English</strong></label>
                            <input
                                type="number"
                                name="english"
                                className="form-control"
                                value={profile.english}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="tamil"><strong>Tamil</strong></label>
                            <input
                                type="number"
                                name="tamil"
                                className="form-control"
                                value={profile.tamil}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="englishLit"><strong>English Lit</strong></label>
                            <input
                                type="number"
                                name="englishLit"
                                className="form-control"
                                value={profile.englishLit}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="sinhala"><strong>Sinhala</strong></label>
                            <input
                                type="number"
                                name="sinhala"
                                className="form-control"
                                value={profile.sinhala}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="art"><strong>Art</strong></label>
                            <input
                                type="number"
                                name="art"
                                className="form-control"
                                value={profile.art}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="ict"><strong>ICT</strong></label>
                            <input
                                type="number"
                                name="ict"
                                className="form-control"
                                value={profile.ict}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="science"><strong>Science</strong></label>
                            <input
                                type="number"
                                name="science"
                                className="form-control"
                                value={profile.science}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="healthScience"><strong>Health Science</strong></label>
                            <input
                                type="number"
                                name="healthScience"
                                className="form-control"
                                value={profile.healthScience}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="maths"><strong>Maths</strong></label>
                            <input
                                type="number"
                                name="maths"
                                className="form-control"
                                value={profile.maths}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Save Profile</button>
                </form>
            </div>
        </div>
    );
};

export default StudentDashboard;
