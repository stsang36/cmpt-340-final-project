import React, { useState } from 'react';
import './css/material-kit.css';
import './css/index.css';
import Help from './views/Help';
import Login from './views/Login';
import Register from './views/Register';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Keyboard from './components/Keyboard';
import FeatureBox from './components/FeatureBox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  const [keyboardVisible, setKeyboardVisible] = useState(false); // state to handle if the keyboard is open or not

  const openKeyboard = () => { // function used to open the keyboard
    setKeyboardVisible(true);
  };

  const closeKeyboard = () => { // function used to close the keyboard
    setKeyboardVisible(false);
  };

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path='/login' element={<Login openKeyboard={openKeyboard} />} />
        <Route path='/register' element={<Register openKeyboard={openKeyboard} />} />
        <Route path='/' element={
          <>
            <Header />

            <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
              <section class="pb-4" id="count-stats">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12 mx-auto">
                      <div class="row">
                        <div class="row text-center my-sm-5 mt-5">
                          <div class="col-lg-6 mx-auto">
                            <span class="badge bg-primary mb-3">Features</span>
                            <h2 class="">Your accessibility companion</h2>
                          </div>
                        </div>
                        <FeatureBox imageLink="./assets/images/core-keys.png" title="8 Core Keys" description="TypeAid enhances typing accessibility by offering only 8 key clusters, allowing users to precisely target their input" />
                        <FeatureBox imageLink="./assets/images/enhanced-control.png" title="Enhanced Control" description="Upon selecting a core key, the keys within the cluster expand, granting refined precision in selecting which keys to engage" />
                        <FeatureBox imageLink="./assets/images/smart-word-prediction.png" title="Smart Word Prediction" description="Crafted from masterfully engineered machine learning, our intelligent word prediction enhances writing seamlessly" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="mb-6">
                <div class="bg-gradient-dark position-relative m-3 border-radius-xl overflow-hidden">
                  <img src="./assets/images/shapes/waves-white.svg" alt="pattern-lines" class="position-absolute start-0 top-md-0 w-100 opacity-2" />
                  <div class="container py-5 postion-relative z-index-2 position-relative">
                    <div class="row">
                      <div class="col-md-7 mx-auto text-center">
                        <h3 class="text-white mb-1">What are you waiting for?</h3>
                        <p class="mb-3 text-white">Experience a refined and accessible typing and text editing journey with TypeAid</p>
                        <a href="#" class="btn btn-primary btn-lg mb-2 mb-sm-0">Join NOW</a>  
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        } />
        <Route path='/help' element={<Help />} />
      </Routes>
      <Keyboard isVisible={keyboardVisible} closeKeyboard={closeKeyboard} />
      <Footer />
    </Router>
  );
}

export default App;
