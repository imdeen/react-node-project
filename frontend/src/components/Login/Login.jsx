import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import avatar from '../../assets/avatar.png';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/login', formData);
        setMessage(response.data);
        if (response.status === 200) {
          navigate('/home');
        }
      } catch (error) {
        setMessage('Error logging in: ' + error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='main'>
    
    <form onSubmit={handleSubmit}>
        <button className='button-square'>Sign Up</button>
      < img className='avatar' src={avatar} alt="avatar" />
      <div>
        <label>
      
          <input
            type="email"
            name="email"
            placeholder='username'
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>
        
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
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
};

export default LoginForm;
