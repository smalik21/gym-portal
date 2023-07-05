import './Dashboard.css';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import Header from '../../../components/Header/Header';
import Stats from '../../../components/Stats/Stats';
import ListItem from '../../../components/ListItem/ListItem';
import dotenv from 'react-dotenv';

export default function Dashboard() {
    const { accountId } = useContext(AuthContext);
    // console.log("dashboard:", accountId, accountType);

    const [member, setMember] = useState({
        name: '',
        username: '',
        password: '',
        contact: {
            phone: '',
            email: ''
        },
        age: '',
        acc_status: '',
        package_type: {
            name: '',
            amt: ''
        },
        payment_status: '',
        joining_date: '',
        notifications: []
    });

    useEffect(() => {
        fetchMember();
        // setStats(member);
    }, []);

    const fetchMember = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+`member/member/${accountId}`);
            // console.log(response);
            setMember(response.data);
            // console.log("Member Loaded:", response.data);
        } catch (error) {
            // console.error('Error retrieving member:', error.response.data);
        }
    };

    const updateNotifications = async (memberId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`member/member/${memberId}`, updatedData);
            // Handle successful response
            // console.log(response.data);
            // Refresh member data
            fetchMember();
        } catch (error) {
            // console.error('Error updating member:', error.response.data);
        }
    };

    const stats = [
        {
            "title": "Account",
            "subTitle": "Status",
            "value": member.acc_status,
            "color": "purple"
        },
        {
            "title": "Monthly",
            "subTitle": "Payment",
            "value": "$"+member.package_type.amt,
            "color": "black"
        },
        {
            "title": "Fee",
            "subTitle": "Package",
            "value": member.package_type.name,
            "color": "green"
        },
        {
            "title": "Payment",
            "subTitle": "Status",
            "value": member.payment_status,
            "color": "orange"
        }
    ]


    const buttons = ["Close"];

    const handleResponse = (notificationIdx, button) => {
        // console.log("Clicked:", member.notifications[notificationIdx]);
        const newNotifications = member.notifications;
        newNotifications.splice(notificationIdx, 1);

        const newData = {
          
                notifications: newNotifications
    
        }
        updateNotifications(accountId, newData);
    }

    return (
        <div className="Dashboard">
            <Header
                title="Dashboard"
            />

            <div className='body'>
                <h4 className='greeting'>Hi, {member.name}</h4>
                <Stats
                    stats={stats}
                />
                <h4 className='heading'>Notifications</h4>
                <div className='List'>
                    {member.notifications.map((notification, idx) => {
                        return (
                            <ListItem
                                key={idx}
                                id={idx}
                                name={notification.type}
                                description={notification.content}
                                buttons={buttons}
                                onClick={handleResponse}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
