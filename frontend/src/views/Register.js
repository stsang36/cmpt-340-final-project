import '../css/login.css';
import '../css/login-util.css';
import '../css/material-kit.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faUser, faLock, faRepeat } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const Register = ({ toggleKeyboardVisibility }) => {

  const [username, setUsername] = useState(''); // initalize the state for username as empty
  const [password, setPassword] = useState(''); // initalize the state for password as empty
  const [confirmPassword, setConfirmPassword] = useState(''); // initalize the state for password confirmation as empty
  const [error, setError] = useState(null); // initalize the the error as null to indicate that there is no error

  const handleUsernameChange = (e) => { // update the username as the user types
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => { // update the password as the user types
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => { // update the password confirmation as the user types
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => { // on form submission handle registration
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Call signup API using POST request to backend at this endpoint: 'http://127.0.0.1:8000/authentication/signup'
      const response = await fetch('http://127.0.0.1:8000/authentication/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) { // handle unsuccessful registration i.e. already registered
        const data = await response.json();
        throw new Error(data.detail);
      }

      const data = await response.json();

      // Handle successful registration
      console.log('Registration successful');
      console.log('Token:', data.token);
      console.log('User data:', data.user);
      // Need to store token and user id and possibly username in localstorage or cookies

    } catch (error) { // Handle error
      setError(error.message);
    }
  };

  return (
    <div class="limiter" style={{ backgroundImage: `url('./assets/images/register-bg.webp')` }}>
      <span class="mask bg-gradient-primary opacity-4"></span>
      <div class="container-login100" style={{ opacity: '0.95' }}>
        <div class="wrap-login100 p-l-55 p-r-55 p-t-50 p-b-54">
          <form class="login100-form" onSubmit={handleRegister}>
            <span class="login100-form-title p-b-49">
              Register
            </span>

            <div class="wrap-input100 m-b-23">
              <span class="label-input100">Username</span>
              <input
                class="input100"
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Type your username"
              />
              <span class="focus-input100"><FontAwesomeIcon icon={faUser} style={{ width: '15px', marginTop: '45px', marginLeft: '15px' }}/></span>
            </div>

            <div class="wrap-input100 m-b-23">
              <span class="label-input100">Password</span>
              <input
                class="input100"
                type="password"
                name="pass"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Type your password"
              />
              <span class="focus-input100"><FontAwesomeIcon icon={faLock} style={{ width: '15px', marginTop: '45px', marginLeft: '15px' }}/></span>
            </div>

            <div class="wrap-input100">
              <span class="label-input100">Confirm Password</span>
              <input
                class="input100"
                type="confirmpassword"
                name="pass"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Type your password again"
              />
              <span class="focus-input100"><FontAwesomeIcon icon={faRepeat} style={{ width: '15px', marginTop: '45px', marginLeft: '15px' }}/></span>
            </div>
            
            <div class="text-right p-t-8 p-b-31"></div>
            
            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>
                <button class="login100-form-btn">
                  Register
                </button>
              </div>
            </div>

            <div class="flex-col-c p-t-50">
              <span class="txt1 p-b-5">
                Already have an account?
              </span>
              <Link to='/login' class="txt2">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
