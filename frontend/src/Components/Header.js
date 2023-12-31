import { React, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { AuthContext } from '../Context/AuthContext';

function Header() {
  const [menutoggle, setMenutoggle] = useState(false);
  const { user } = useContext(AuthContext);

  const Toggle = () => {
    setMenutoggle(!menutoggle);
  };

  const closeMenu = () => {
    setMenutoggle(false);
  };

  return (
    <div className="header">
      <div className="logo-nav">
        <Link to="/">
          <a href="#home"><LibraryBooksIcon/> Library</a>
        </Link>
      </div>
      <div className="nav-right">
        <ul className={menutoggle ? 'nav-options active' : 'nav-options'}>
          <li className="option" onClick={() => closeMenu()}>
            <Link to="/">
              <a href="#home">Home</a>
            </Link>
          </li>
          {!user && (
            <li className="option" onClick={() => closeMenu()}>
              <Link to="/register">
                <a href="#register">Register</a>
              </Link>
            </li>
          )}
          <li className="option" onClick={() => closeMenu()}>
            {user ? (
              user.isAdmin ? (
                <Link to="/dashboard@admin">
                  <a href="#dashboard">Dashboard</a>
                </Link>
              ) : (
                <Link to="/dashboard@member">
                  <a href="#dashboard">Dashboard</a>
                </Link>
              )
            ) : (
              <Link to="/signin">
                <a href="signin">SignIn</a>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className="mobile-menu" onClick={() => Toggle()}>
        {menutoggle ? (
          <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
        ) : (
          <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
        )}
      </div>
    </div>
  );
}

export default Header;
