import React from 'react';
import { Link } from 'react-router-dom';


const Welcome = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <div className="text-center p-4 bg-white rounded shadow-sm">
                <h1 className="mb-4">Welcome to the Student Management System</h1>
                <p className="lead mb-4">Manage your students and teachers with ease.</p>
                <div className="d-flex flex-column align-items-center">
                    <Link to="/student-signup" className="btn btn-primary btn-lg mb-3 w-75 rounded-0">
                        Student Login/Signup
                    </Link>
                    <Link to="/register" className="btn btn-success btn-lg w-75 rounded-0">
                        Teacher Login/Signup
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;