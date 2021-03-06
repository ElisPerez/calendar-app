import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {
  const { name, isAuthenticated } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>{isAuthenticated ? name : 'Anonymous'}</span>
      <button onClick={handleLogout} className='btn btn-outline-danger'>
        <i className='fas fa-sign-out-alt'></i>
        <span> Exit</span>
      </button>
    </div>
  );
};
