import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../redux/loginSlice';

const Wrapper = () => {
  const location = useLocation();

  const authedUser = useSelector(selectLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authedUser) {
      navigate('/login', { state: { prevUrl: location.pathname } });
    }
  }, [authedUser]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Wrapper;
