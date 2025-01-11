import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Input from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { rawData } from '../Data';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const findUser = (email, password) => {
    const { admin, managers } = rawData.organization;

    // Check admin
    if (admin.email === email && admin.password === password) {
      return { ...admin, role: 'admin' };
    }

    // Check managers and their employees
    for (let manager of managers) {
      if (manager.email === email && manager.password === password) {
        return { ...manager, role: 'manager' };
      }
      for (let employee of manager.employees) {
        if (employee.email === email && employee.password === password) {
          return { ...employee, role: 'employee' };
        }
        for (let junior of employee.junior_employees) {
          if (junior.email === email && junior.password === password) {
            return { ...junior, role: 'junior_employee' };
          }
        }
      }
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = findUser(formData.email, formData.password);
  
    if (user) {
      const userToStore = {
        name: user.name,
        email: user.email,
        role:user.role
      };
      localStorage.setItem('loggedInUser', JSON.stringify(userToStore));
  
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'manager') {
        navigate('/manager');
      } else if (user.role === 'employee') {
        navigate('/employee');
      } else if (user.role === 'junior_employee') {
        navigate('/junior_employee');
      }
    } else {
      setError('Invalid email or password');
    }
  };
  

  return (
    <div className='login'>
      <div className='container'>
        <div className='form-container'>
          <h1>Welcome To Amble</h1>
          <p>A Comprehensive Solution to Simplify Building Operations and Streamline Building Management for a Modern Lifestyle</p>
          <form className='login-form' onSubmit={handleSubmit}>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              required
            />
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className='submit-button'>Login</button>
            <div className='social-login-container'>
              <p>or</p>
              <div className='social-login'>
                <div className='google-login'>
                  <FaGoogle />
                  Google
                </div>
                <div className='facebook-login'>
                  <FaFacebookF />
                  Facebook
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
