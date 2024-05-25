import {
  Box,
  Tabs,
  Tab,
  AppBar,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Container,
  Toolbar,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeLogin } from '../../redux/loginSlice';

const route = ['/', '/leaderboard', '/add'];

const settings = ['Logout'];

const Header = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.login.authedUser);
  const users = useSelector((state) => state.users.users);

  const [value, setValue] = React.useState('/');
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(removeLogin());
  };

  useEffect(() => {
    route.includes(window.location.pathname) ? setValue(window.location.pathname) : setValue(false);
  }, []);

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Container maxWidth="">
          <Toolbar disableGutters>
            <Box sx={{ width: '100%' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
              >
                <Tab label="Home" value={route[0]} component={Link} to={route[0]} />
                <Tab label="Leaderboard" value={route[1]} component={Link} to={route[1]} />
                <Tab label="New" value={route[2]} component={Link} to={route[2]} />
              </Tabs>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={users[authedUser]?.avatarURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography marginLeft="5px" component="p">
              {authedUser}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
