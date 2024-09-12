import './LoginPage.css';

import React, { useState } from 'react';

import SubmitButton from './components/SubmitButton';
import UsernameInput from './components/UsernameInput';
import { connect } from 'react-redux';
import logo from '../resources/logo.png';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import { setUsername } from '../store/actions/dashboardActions';
import { useNavigate } from 'react-router-dom';

// Changed useHistory to useNavigate

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();  // Replaced useHistory with useNavigate

  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    navigate('/dashboard');  // Replaced history.push with navigate
  };

  return (
    <div className='login-page_container background_main_color'>
      <div className='login-page_login_box background_secondary_color'>
        <div className='login-page_logo_container'>
          <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
        </div>
        <div className='login-page_title_container'>
          <h2>Get on Board</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
