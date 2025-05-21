import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';



const NavBar = () => {
  const [isOpen, setIsOpen] = useState('home');
  const [checkUser, setCheckUser] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      setCheckUser(user.id);
    } else {
      navigate('/login')
    }
  }, [user]);

  return (
    <div className={`navBar ${user?.theme === 'dark' ? 'dark' : 'light'}`}>
      <Link className='navBar__link' onClick={() => setIsOpen('home')} to="/">
        <FontAwesomeIcon icon="fa-solid fa-house" className={isOpen === 'home' ? 'navBar__link--icon active' : 'navBar__link--icon'} />
      </Link>
      <Link className='navBar__link' onClick={() => setIsOpen('search')} to="/search">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className={isOpen === 'search' ? 'navBar__link--icon active' : 'navBar__link--icon'} />
      </Link>
      <Link className='navBar__link' onClick={() => setIsOpen('profile')} to={checkUser ? `/influencer/${user?.id}` : () => alert("Tell user to sign in first")}>
        <FontAwesomeIcon icon="fa-solid fa-user" className={isOpen === 'profile' ? 'navBar__link--icon active' : 'navBar__link--icon'} />
      </Link>
      <Link className='navBar__link' onClick={() => setIsOpen('settings')} to="/settings">
        <FontAwesomeIcon icon="fa-solid fa-gear" className={isOpen === 'settings' ? 'navBar__link--icon active' : 'navBar__link--icon'} />
      </Link>
    </div>
  );
};

export default NavBar;