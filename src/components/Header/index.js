import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';

import { Nav } from './styled';

export default function Header() {
  const isLoggendIn = useSelector((state) => state.auth.isLoggedIn);
  const dispath = useDispatch();
  const history = useHistory();
  function handleLogout(e) {
    e.preventDefault();
    dispath(actions.loginFailure());
    toast.error('Você foi deslogado!');
    history.push('/');
  }

  return (
    <Nav>
      <Link to='/'>
        <FaHome size={24} />
      </Link>

      <Link to='/register'>
        <FaUserAlt size={24} />
      </Link>
      {isLoggendIn ? (
        // eslint-disable-next-line react/jsx-no-bind
        <Link onClick={handleLogout} to='/logout'>
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to='/login'>
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggendIn && <FaCircle size={24} color='#66ff33' />}
    </Nav>
  );
}
