import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <div className="nav-bar">
    <NavLink exact to="/" activeStyle={{ backgroundColor: 'grey' }}>Home </NavLink>
    <NavLink exact to="/weekly-scedule" activeStyle={{ backgroundColor: 'grey' }}>Weekly Scedule </NavLink>
    <NavLink exact to="/productivity-session" activeStyle={{ backgroundColor: 'grey' }}>Productivity Session </NavLink>
    <NavLink exact to="/note" activeStyle={{ backgroundColor: 'grey' }}>Notes </NavLink>
  </div>
);

export default Nav;
