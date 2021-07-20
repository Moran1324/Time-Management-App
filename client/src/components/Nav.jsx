import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useAuth from '../hooks/useAuth';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NAV_LOCATIONS = [
  '',
  'daily-agenda',
  'weekly-schedule',
  'productivity-session',
  'note',
];

const Nav = () => {
  const location = useLocation();

  const [value, setValue] = useState(0);
  const { signout } = useAuth();

  const classes = useStyles();

  useEffect(() => {
    const currentTabLocation = location.pathname.split('/')[1];
    setValue(NAV_LOCATIONS.indexOf(currentTabLocation));
    // console.log('location: ', currentTabLocation);
  }, [location]);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  return (

    <div className={`nav-bar ${classes.root}`}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Daily Agenda" component={Link} to="/daily-agenda" />
            <Tab label="Weekly Schedule" component={Link} to="/weekly-schedule" />
            <Tab label="Productivity Session" component={Link} to="/productivity-session" />
            <Tab label="Notes" component={Link} to="/note" />
          </Tabs>
          <IconButton onClick={signout} edge="end" color="inherit" aria-label="logout">
            <ExitToAppIcon />
          </IconButton>
          {/* <Button onClick={signout} color="inherit">Logut</Button> */}
        </Toolbar>
      </AppBar>
    </div>

  // <div className="nav-bar">
  //   <NavLink exact to="/" activeStyle={{ backgroundColor: 'grey' }}>Home </NavLink>
  //   <NavLink exact to="/daily-agenda" activeStyle={{ backgroundColor: 'grey' }}>Daily Agenda </NavLink>
  //   <NavLink exact to="/weekly-scedule" activeStyle={{ backgroundColor: 'grey' }}>Weekly Scedule </NavLink>
  //   <NavLink exact to="/productivity-session" activeStyle={{ backgroundColor: 'grey' }}>Productivity Session </NavLink>
  //   <NavLink exact to="/note" activeStyle={{ backgroundColor: 'grey' }}>Notes </NavLink>
  //   { isLogged
  //   // `Hello ${JSON.stringify(currentUser)}`
  //     ? <div onClick={signout}>Logout</div>
  //     : <NavLink exact to="/login" activeStyle={{ backgroundColor: 'grey' }}>Login </NavLink>}
  // </div>
  );
};

export default Nav;
