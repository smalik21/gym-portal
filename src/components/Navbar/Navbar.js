import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar(props) {
  const [active, setActive] = useState('Dashboard');
  const [navbarExpanded, setNavbarExpanded] = useState(true);

  function toggleNavbar() {
    setNavbarExpanded(!navbarExpanded);
  }

  function handleClick(event) {
    setActive(event.target.innerHTML);
    props.onClick(event.target.innerHTML);
  }

  function handleLogout() {
    props.onLogout();
  }

  useEffect(() => {
    function handleResize() {
      setNavbarExpanded(window.innerWidth >= 992);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='Navbar'>
      {window.innerWidth < 992 && (
        <button onClick={toggleNavbar} className={`navbar-toggle ${navbarExpanded}`}>
          <i className='fa fa-bars'></i>
        </button>
      )}
      {(window.innerWidth >= 992 || navbarExpanded) && (
        <div className='navbar'>
          <h1>Gym Portal</h1>
          <div className='line'></div>
          <div className='nav-buttons'>
            {props.navList.map((nav, idx) => (
              <button
                key={idx}
                className={`nav-button ${active === nav ? 'selected' : ''}`}
                onClick={handleClick}
              >
                {nav}
              </button>
            ))}
          </div>
          <div className='line'></div>
          <button onClick={handleLogout} className='Logout'>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
