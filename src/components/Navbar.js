import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import temple from '../assets/temple.svg';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout, error } = useLogout();

  const logoutHanlder = () => {
    logout().then(() => {
      navigate('/');
    });
  };
  if (error) {
    window.alert({ error });
  }
  return (
    <div className="navbar w-[100%] py-[30px] px-0">
      <ul>
        <li className="logo text-slate-700">
          <img src={temple} alt="Daily Do logo" className="text-slate-700" />
          <span>Daily Do</span>
        </li>
        {!user && (
          <>
            <li>
              <Link
                className="text-slate-700 bg-slate-300 p-2 rounded-md hover:opacity-50 cursor-pointer transition-all duration-500 ease-in"
                to="/login"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                className="text-slate-700 bg-slate-300 p-2 rounded-md hover:opacity-50 cursor-pointer transition-all duration-500 ease-in"
                to="/signup"
              >
                Register
              </Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button
              onClick={logoutHanlder}
              className="btn bg-slate-700 text-slate-300 rounded-lg hover:opacity-50 cursor-pointer transition-all duration-500 ease-in"
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
