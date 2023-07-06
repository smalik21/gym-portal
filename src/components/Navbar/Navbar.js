import { useState, useEffect } from 'react';
import './Navbar.css';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: '#fff',
    }
  },
});

export default function Navbar(props) {
  const [innerWidth, setInnerWidth] = useState('');
  const [active, setActive] = useState('Dashboard');
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [buttonIcon, setButtonIcon] = useState(
    <KeyboardArrowLeftOutlinedIcon color="action" />
  );

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
      const windowWidth = window.innerWidth;
      setInnerWidth(windowWidth);
      
      if (windowWidth < 500) {
        setButtonIcon(navbarExpanded ? (
          <KeyboardArrowUpOutlinedIcon color="primary" />
        ) : (
          <KeyboardArrowDownIcon color="primary" />
        ));
      } else if (windowWidth < 992) {
        setButtonIcon(navbarExpanded ? (
          <KeyboardArrowLeftOutlinedIcon color="primary" />
        ) : (
          <KeyboardArrowRightOutlinedIcon color="primary" />
        ));
      } 
      else {
        setNavbarExpanded(true);
      }
    }

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, [navbarExpanded]); 

  return (
    <div className="Navbar">
      {innerWidth < 992 && (
        <button onClick={toggleNavbar} className={`navbar-toggle ${navbarExpanded}`}>
        <ThemeProvider theme={theme}>
          {buttonIcon}
        </ThemeProvider>
          
        </button>
      )}

      {(window.innerWidth >= 992 || navbarExpanded) && (
        <div className="navbar">
          <h1>Gym Portal</h1>
          <div className="line"></div>
          <div className="nav-buttons">
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
          <div className="line"></div>
          <button onClick={handleLogout} className="Logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
