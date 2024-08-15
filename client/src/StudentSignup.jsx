import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentSignup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let isValid = true;
        let errors = {};

        if (!firstName) {
            errors.firstName = "First Name is required.";
            isValid = false;
        }

        if (!lastName) {
            errors.lastName = "Last Name is required.";
            isValid = false;
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errors.email = "A valid Email is required.";
            isValid = false;
        }

        if (!age || isNaN(age) || age <= 18) {
            errors.age = "Age must be a number greater than 18.";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // Check if email is unique
        axios.post('http://localhost:3004/students/check-email', { email })
            .then(response => {
                if (response.data.exists) {
                    setErrors(prevErrors => ({ ...prevErrors, email: "Email is already in use." }));
                } else {
                    axios.post('http://localhost:3004/students/student-register', { firstName, lastName, age, email, password })
                        .then(result => {
                            console.log('Success:', result.data);
                            navigate('/student-login');
                        })
                        .catch(err => {
                            console.error('Error:', err.message);
                        });
                }
            })
            .catch(err => {
                console.error('Error checking email:', err.message);
            });
    };
    
    return (
        <div className="d-flex justify-content-center align-items-center bg-white vh-100">
            <div className="bg-white p-4 rounded w-25">
                <h2>Student Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName">
                            <strong>First Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            autoComplete="off"
                            name="firstName"
                            className="form-control rounded-0"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName">
                            <strong>Last Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            autoComplete="off"
                            name="lastName"
                            className="form-control rounded-0"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="age">
                            <strong>Age</strong>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Age"
                            autoComplete="off"
                            name="age"
                            className="form-control rounded-0"
                            onChange={(e) => setAge(e.target.value)}
                        />
                        {errors.age && <div className="text-danger">{errors.age}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p className="mt-2">Already Have an Account?</p>
                <Link to="/student-login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default StudentSignup;
