import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (new Date(formData.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = 'Date of birth cannot be in the future';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/register', formData);
        setMessage(response.data);
        navigate('/login');
      } catch (error) {
        setMessage('Error creating user: ' + error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="text"
            name="username"
            placeholder='username'
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>
          <input
            type="email"
            name="email"
            placeholder='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder='password'
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            placeholder='confirm password'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <div>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
      </div>
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignupForm;
