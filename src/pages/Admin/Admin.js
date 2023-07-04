import './Admin.css';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
// import Header from '../../components/Header/Header';
import Dashboard from './Dashboard/Dashboard';
import Members from './Members/Members';
import Users from './Users/Users';
import Bills from './Bills/Bills';
import FeePackages from './FeePackages/FeePackages';
import Notifications from './Notifications/Notifications';
import Report from './Report/Report';
import Admins from './Admins/Admins';
import Profile from './Profile/Profile';

export default function Admin({ onLogout }) {

    const navList = ["Dashboard", "Members", "Users", "Bills", "Fee Packages", "Notifications", "Report", "Admins", "Profile"];
    const [page, setPage] = useState(navList[0]);

    const componentMapping = {
        "Dashboard": Dashboard,
        "Members": Members,
        "Users": Users,
        "Bills": Bills,
        "Fee Packages": FeePackages,
        "Notifications": Notifications,
        "Report": Report,
        "Admins": Admins,
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
        <div className="Admin">
            <Navbar 
            navList={navList}
            onClick={handleNavClick}
            onLogout={handleLogout}
            />
            {renderPage()}
        </div>
    )
}