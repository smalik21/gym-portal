import './Member.css';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import PaymentHistory from './PaymentHistory/PaymentHistory';
import Profile from './Profile/Profile';

export default function Member({ onLogout }) {

    const navList = ["Dashboard", "Payment History", "Profile"];
    const [page, setPage] = useState(navList[0]);

    const componentMapping = {
        "Dashboard": Dashboard,
        "Payment History": PaymentHistory,
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
        <div className="Member">
            <Navbar 
            navList={navList}
            onClick={handleNavClick}
            onLogout={handleLogout}
            />
            {renderPage()}
        </div>
    )
}