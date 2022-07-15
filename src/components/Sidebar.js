import './Sidebar.css';

import React from 'react';

//icons

import DashboardIcon from '../assets/dashboard.svg';
import Add from '../assets/add.svg';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className="sidebar md:hidden sm:hidden lg:block bg-slate-700">
      <div className="sidebar-content">
        <div className="user text-white">
          {user ? (
            <>
              <Avatar src={user ? user.photoURL : ''} />
              <p>Welcome, {user ? user.displayName : ''}</p>
            </>
          ) : (
            <p>Sign in to see details</p>
          )}
        </div>
        {user && (
          <nav className="links">
            <ul>
              <li>
                <NavLink to="/">
                  <img src={DashboardIcon} alt="Dashboard Icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/create">
                  <img src={Add} alt="Add Icon" />
                  <span>New Project</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
