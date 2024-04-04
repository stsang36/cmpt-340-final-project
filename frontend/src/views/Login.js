import '../css/login.css';
import '../css/login-util.css';
import '../css/material-kit.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Keyboard from '../components/Keyboard';

const Login = ({ openKeyboard }) => {

  const [username, setUsername] = useState(''); // initalize state for username as empty
  const [password, setPassword] = useState(''); // initalize state for password as empty

  const handleUsernameChange = (e) => { // update username as the user types
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => { // update the password as the user types
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => { // on form submission handle login
    e.preventDefault();
    try {
      // Call login API using POST request to backend at this endpoint: 'http://127.0.0.1:8000/authentication/login'
      const response = await fetch('http://127.0.0.1:8000/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) { // Handle successful login
        console.log('Login successful');
        console.log('Token:', responseData.token);
        console.log('User data:', responseData.user);
        // Need to store token and user id and possibly username in localstorage or cookies
      } else { // Handle failed login
        console.error('Login failed:', responseData.detail);
      }
    } catch (error) { // Handle error
      console.error('Error occurred:', error);
    }
  };

  return (
    <div class="limiter" style={{ backgroundImage: `url('./assets/images/login-bg.webp')` }}>
      <span class="mask bg-gradient-primary opacity-4"></span>
      <div class="container-login100" style={{ opacity: '0.95' }}>
        <div class="wrap-login100 p-l-55 p-r-55 p-t-50 p-b-54">
          <form class="login100-form" onSubmit={handleLogin}>
            <span class="login100-form-title p-b-49">
              Login
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
                onClick={openKeyboard}
              />
              <span class="focus-input100"><FontAwesomeIcon icon={faUser} style={{ width: '15px', marginTop: '45px', marginLeft: '15px' }}/></span>
            </div>

            <div class="wrap-input100">
              <span class="label-input100">Password</span>
              <input
                class="input100"
                type="password"
                name="pass"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Type your password"
                onClick={openKeyboard}
              />
              <span class="focus-input100"><FontAwesomeIcon icon={faLock} style={{ width: '15px', marginTop: '45px', marginLeft: '15px' }}/></span>
            </div>
            
            <div class="text-right p-t-8 p-b-31">
              <input type="checkbox" id="remember" name="remember" />
              <label for="remember">Remember me</label>
            </div>
            
            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>
                <button class="login100-form-btn">
                  Login
                </button>
              </div>
            </div>

            <div class="flex-col-c p-t-50">
              <span class="txt1 p-b-5">
                Don't have an account?
              </span>
              <Link to='/register' class="txt2">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
