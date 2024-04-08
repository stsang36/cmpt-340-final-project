import '../css/login.css';
import '../css/login-util.css';
import '../css/material-kit.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Keyboard from '../components/Keyboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faRepeat, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Register = ({ isLoggedIn, setIsLoggedIn, isVisible, setKeyboardVisible, closeKeyboard, openKeyboard, keyColor, setKeyColor, editingTextEditor, setEditingTextEditor }) => {

  const [username, setUsername] = useState(''); // initalize the state for username as empty
  const [password, setPassword] = useState(''); // initalize the state for password as empty
  const [confirmPassword, setConfirmPassword] = useState(''); // initalize the state for password confirmation as empty
  const [errorMessage, setErrorMessage] = useState(<div class="m-t-20"></div>);
  const [activeFieldReg, setActiveField] = useState([false, false, false]); // initalize state for keeping track of whether the username or password is active -- index 0 is for username and index 1 is for password

  const navigate = useNavigate();
  
  const handleUsernameClick = () => {
    setActiveField([true, false, false]);
  };

  const handlePasswordClick = () => {
    setActiveField([false, true, false]);
  }

  const handleConfirmPasswordClick = () => {
    setActiveField([false, false, true]);
  }

  const handleUsernameChangeReg = (key) => { // update the username as the user types
    if(key === 'backspace') {
      setUsername(prevUsername => prevUsername.slice(0, -1));
    } else {
      setUsername(prevUsername => prevUsername + key);
    }
  };

  const handlePasswordChangeReg = (key) => { // update the password as the user types
    if(key === 'backspace') {
      setPassword(prevPassword => prevPassword.slice(0, -1));
    } else {
      setPassword(prevPassword => prevPassword + key);
    }
  };

  const handleConfirmPasswordChangeReg = (key) => { // update the password confirmation as the user types
    if(key === 'backspace') {
      setConfirmPassword(prevConfirmPassword => prevConfirmPassword.slice(0, -1));
    } else {
      setConfirmPassword(prevConfirmPassword => prevConfirmPassword + key);
    }
  };

  const handleRegister = async (e) => { // on form submission handle registration
    setIsLoggedIn(false); // Set isLoggedIn to false as default each time the form is submitted
    e.preventDefault();

    if (username === '' || password === '' || confirmPassword === '') {
      setErrorMessage(
        <div class="invalid m-t-20">
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }}/> Please input all fields
        </div>
      );

      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        <div class="invalid m-t-20">
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }}/> Passwords do not match
        </div>
      );
      
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
        setErrorMessage(
          <div class="invalid m-t-20">
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }}/> Username already exists
          </div>
        );
        throw new Error(data.detail);
      }

      const data = await response.json();

      // Handle successful registration
      console.log('Registration successful');
      console.log('Token:', data.token);
      console.log('User data:', data.user);
      setErrorMessage(
        <div class="valid m-t-20">
          <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px' }}/> You have successfully registered
        </div>
      );
      setIsLoggedIn(true); // If the registration is successful then the user is logged in
      setActiveField([false, false, false]);
      setEditingTextEditor(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', data.token);
      navigate('/user');
      openKeyboard();
      // Need to store token and user id and possibly username in localstorage or cookies

    } catch (error) { // Handle error
      console.log(error.message);
    }
  };

  return (
    <div>
      <Keyboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isVisible={isVisible} closeKeyboard={closeKeyboard} handleUsernameChangeReg={handleUsernameChangeReg} handlePasswordChangeReg={handlePasswordChangeReg} handleConfirmPasswordChangeReg={handleConfirmPasswordChangeReg} activeFieldReg={activeFieldReg} keyColor={keyColor} setKeyColor={setKeyColor} editingTextEditor={editingTextEditor} setEditingTextEditor={setEditingTextEditor} />
      {!isVisible && (
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
                    onChange={handleUsernameChangeReg}
                    placeholder="Type your username"
                    onClick={() => { openKeyboard(); handleUsernameClick(); }}
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
                    onChange={handlePasswordChangeReg}
                    placeholder="Type your password"
                    onClick={() => { openKeyboard(); handlePasswordClick(); }}
                  />
                  <span class="focus-input100"><FontAwesomeIcon icon={faLock} style={{ width: '15px', marginTop: '45px', marginLeft: '15px' }}/></span>
                </div>

                <div class="wrap-input100">
                  <span class="label-input100">Confirm Password</span>
                  <input
                    class="input100"
                    type="password"
                    name="pass"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChangeReg}
                    placeholder="Type your password again"
                    onClick={() => { openKeyboard(); handleConfirmPasswordClick(); }}
                  />
                  <span class="focus-input100"><FontAwesomeIcon icon={faRepeat} style={{ width: '15px', marginTop: '45px', marginLeft: '15px' }}/></span>
                </div>
                
                {errorMessage}
                
                <div class="container-login100-form-btn p-t-20">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button class="login100-form-btn">
                      Register
                    </button>
                  </div>
                </div>

                <div class="flex-col-c p-t-35">
                  <span class="txt1 p-b-5">
                    Already have an account?
                  </span>
                  <Link to='/login' class="txt2">Login</Link>
                </div>
              </form>
            </div>
          </div>
        <Footer setKeyColor={setKeyColor} keyColor={keyColor} />
      </div>
      )}
    </div>
  );
}

export default Register;
