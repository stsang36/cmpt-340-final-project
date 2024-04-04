import '../css/login.css';
import '../css/login-util.css';
import '../css/material-kit.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faUser, faLock, faRepeat, faRemove, faExclamationCircle, faCircleExclamation, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Keyboard from '../components/Keyboard';
import Footer from '../components/Footer';

const Login = ({ isVisible, closeKeyboard, openKeyboard }) => {

  const [username, setUsername] = useState(''); // initalize state for username as empty
  const [password, setPassword] = useState(''); // initalize state for password as empty
  const [errorMessage, setErrorMessage] = useState(<div></div>);

  const navigate = useNavigate();

  const [activeField, setActiveField] = useState([false, false]); // initalize state for keeping track of whether the username or password is active -- index 0 is for username and index 1 is for password

  const handleUsernameClick = () => {
    setActiveField([true, false]);
  };

  const handlePasswordClick = () => {
    setActiveField([false, true]);
  }

  const handleUsernameChange = (key) => {
    if(key === 'backspace') {
      setUsername(prevUsername => prevUsername.slice(0, -1));
    } else {
      setUsername(prevUsername => prevUsername + key);
    }
  };

  const handlePasswordChange = (key) => {
    if(key === 'backspace') {
      setPassword(prevPassword => prevPassword.slice(0, -1));
    } else {
      setPassword(prevPassword => prevPassword + key);
    }
  };

  const handleLogin = async (e) => { // on form submission handle login
    e.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage(
        <div class="invalid">
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }}/> Please input all fields
        </div>
      );
      return;
    }

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
        navigate('/');
        // Need to store token and user id and possibly username in localstorage or cookies
      } else { // Handle failed login
        console.error('Login failed:', responseData.detail);
        setErrorMessage(
          <div class="invalid">
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }}/> Invalid username or password
          </div>
        );
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
                onClick={() => { openKeyboard(); handleUsernameClick(); }}
                readOnly
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
                onClick={() => { openKeyboard(); handlePasswordClick(); }}
              />
              <span class="focus-input100"><FontAwesomeIcon icon={faLock} style={{ width: '15px', marginTop: '45px', marginLeft: '15px' }}/></span>
            </div>
            
            <div class="text-right p-t-8">
              <input type="checkbox" id="remember" name="remember" />
              <label for="remember">Remember me</label>
            </div>

            {errorMessage}
            
            <div class="container-login100-form-btn p-t-20">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>
                <button class="login100-form-btn">
                  Login
                </button>
              </div>
            </div>

            <div class="flex-col-c p-t-35">
              <span class="txt1 p-b-5">
                Don't have an account?
              </span>
              <Link to='/register' class="txt2">Register</Link>
            </div>
          </form>
        </div>
      </div>
      <Keyboard isVisible={isVisible} closeKeyboard={closeKeyboard} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} activeField={activeField} />
      <Footer />
    </div>
    
  );
}

export default Login;
