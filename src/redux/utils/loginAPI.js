import { _getUsers } from '../../_DATA';

export const checkLogin = async (username, password) => {
  const users = await _getUsers();
  if (users[username] && users[username].password) {
    return true;
  }

  return false;
};
