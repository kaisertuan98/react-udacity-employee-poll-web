import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/userSlice';

const Users = () => {
  const dispatch = useDispatch();
  dispatch(getAllUsers());

  return <div>Users</div>;
};

export default Users;
