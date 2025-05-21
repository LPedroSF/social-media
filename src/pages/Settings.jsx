import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { theme, toggleTheme, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='settings'>
      <div className="settings__header">
        <h1>Settings</h1>
        <button className='settings__header--button' onClick={() => toggleTheme()}>
          <FontAwesomeIcon className='settings__header--icon' icon="fa-solid fa-lightbulb" />
        </button>
      </div>
      <div className="settings__menu">
        <div className="settings__menu--option">
          <h3>Change Password</h3>
          <button>Change Password</button>
        </div>
        <button onClick={()=> logout()}> Log out</button>
      </div>
    </div>
  );
};

export default Settings;