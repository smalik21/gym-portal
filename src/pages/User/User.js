import './User.css';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';

export default function User({ onLogout }) {

    const navList = ["Dashboard", "Profile"];
    const [page, setPage] = useState(navList[0]);

    const componentMapping = {
        "Dashboard": Dashboard,
        "Profile": Profile
    };

    function handleNavClick(page) {
        setPage(page);
    }

    function handleLogout() {
        onLogout();
    }

    const renderPage = () => {
        const Component = componentMapping[page];
        return <Component />
    }

    return (
        <div className="User
    ">
            <Navbar 
            navList={navList}
            onClick={handleNavClick}
            onLogout={handleLogout}
            />
            {renderPage()}
        </div>
    )
}