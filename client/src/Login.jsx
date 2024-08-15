import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        axios.post('http://localhost:3004/teachers/login', { email, password }) //path for Routes-TeacherRoutes-login function
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate('/teacher-dashboard');
                } else {
                    setErrorMessage('Invalid email or password');
                }
            })
            .catch(err => {
                console.log(err);
                setErrorMessage('An error occurred. Please try again later.');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-white vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}> 
                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                </form>
                <p>Don't Have an Account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">SignUp</Link>
            </div>
        </div>
    );
}

export default Login;
