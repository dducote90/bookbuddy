//Navigations.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navigations = ({ user }) => {
  return (
    <nav>
      <NavLink to="/" activeclassname="active-link">
        Home
      </NavLink>
      <NavLink to="/books" activeclassname="active-link">
        Books
      </NavLink>
      <NavLink to="/aboutus" activeclassname="active-link">
        About Us
      </NavLink>
      {user.email ? (
        <span>
          <NavLink to="/account" activeclassname="active-link">
            User
          </NavLink>
        </span>
      ) : (
        <span>
          <NavLink to="/login" activeclassname="active-link">
            Login
          </NavLink>
          <NavLink to="/register" activeclassname="active-link">
            Register
          </NavLink>
        </span>
      )}
    </nav>
  );
};

export default Navigations;
