import './Dashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Stats from '../../../components/Stats/Stats';
import ListItem from '../../../components/ListItem/ListItem';
import MemberCard from '../../../components/MemberCard/MemberCard';
import dotenv from 'react-dotenv';


export default function Dashboard() {

    const [bills, setBills] = useState([]);
    const [members, setMembers] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [activeMembers, setActiveMembers] = useState(0);
    const [pendingPayments, setPendingPayments] = useState(0);
    const [monthlyEarnings, setMonthlyEarnings] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);

    const [filteredMembers, setFilteredMembers] = useState([]);
    const [nameQuery, setNameQuery] = useState('');
    const [activeStatusQuery, setActiveStatusQuery] = useState('');
    const [packageTypeQuery, setPackageTypeQuery] = useState('');
    const [paymentStatusQuery, setPaymentStatusQuery] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [selectedMember, setSelectedMember] = useState({});
    // const [formType, setFormType] = useState("");


    useEffect(() => {
        fetchMembers();
        fetchBills();
    }, []);

    useEffect(() => {
        setStats(members);
    }, [members]);

    useEffect(() => {
        const filtered = members.filter(member => {
            const name = member.name.toLowerCase();
            const activeStatus = member.acc_status.toLowerCase();
            const packageType = member.package_type.name.toLowerCase();
            const paymentStatus = member.payment_status.toLowerCase();

            const nameMatch = name.startsWith(nameQuery.toLowerCase());
            const activeMatch = activeStatus.startsWith(activeStatusQuery.toLocaleLowerCase());
            const packageTypeMatch = packageType.startsWith(packageTypeQuery.toLowerCase());
            const paymentStatusMatch = paymentStatus.startsWith(paymentStatusQuery.toLowerCase());

            return nameMatch && activeMatch && packageTypeMatch && paymentStatusMatch;
        });

        setFilteredMembers(filtered);
    }, [members, nameQuery, activeStatusQuery, packageTypeQuery, paymentStatusQuery]);


    // http://localhost:5000/admin/
    const fetchMembers = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+'admin/members');
            setMembers(response.data);
            // console.log("Members Loaded:", response.data);
            // setStats(members);
        } catch (error) {
            // console.error('Error retrieving members:', error.response.data);
        }
    };

    const fetchBills = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+'admin/bills');

            // Sort members alphabetically by name
            response.data.sort((a, b) => a.memberName.localeCompare(b.memberName));

            setBills(response.data);
            // console.log("Bills Loaded:", response.data);
            // setStats(members);
        } catch (error) {
            // console.error('Error retrieving bills:', error.response.data);
        }
    };

    const setStats = (members) => {
        let total = 0;
        let active = 0;
        let pending = 0;
        let monthly = 0;

        members.map((member) => {
            console.log(member);
            total = total + 1;
            active = (member.acc_status === "active") ? active + 1 : active;
            pending = (member.payment_status === "pending") ? pending + 1 : pending;
            monthly = monthly + member.package_type.amt;
        })

        let earnings = 0;

        bills.map((bill) => {
            if(bill.status === "paid") {
                earnings = earnings + bill.totalAmt;
            }
        })

        setTotalMembers(total);
        setActiveMembers(active);
        setPendingPayments(pending);
        setMonthlyEarnings(monthly);
        setTotalEarnings(earnings);

        // console.log("Total Members:", totalMembers, "Active Members:", activeMembers, "Pending Payments:", pendingPayments, "Monthly Earnings:", monthlyEarnings, "Total Earnings", totalEarnings);
    }


    const stats = [
        {
            "title": "Total",
            "subTitle": "Members",
            "value": totalMembers,
            "color": "purple"
        },
        {
            "title": "Active",
            "subTitle": "Members",
            "value": activeMembers,
            "color": "green"
        },
        {
            "title": "Total",
            "subTitle": "Earnings",
            "value": "$"+totalEarnings,
            "color": "black"
        },
        {
            "title": "Pending",
            "subTitle": "Payments",
            "value": pendingPayments,
            "color": "orange"
        },
        {
            "title": "Monthly",
            "subTitle": "Earnings",
            "value": "$"+monthlyEarnings,
            "color": "purple"
        }
    ]

    const handleResponse = (memberId, button) => {
        const foundMember = members.find((member) => member._id === memberId);
        setSelectedMember(foundMember);
        setShowForm(true);
    }

    const handleClose = () => {
        setShowForm(false);
        setSelectedMember({});
    }

    return (
        <div className="Dashboard">
        {showForm && (
            <MemberCard member={selectedMember} onClose={handleClose} />
            )}
            <Header
                title="Dashboard"
            />

            <div className='body'>
                <h4 className='heading'>Overview</h4>
                <Stats
                    stats={stats}
                />
                <h4 className='heading'>Search Records</h4>
                <div className='query'>
                    <div className='query-input'>
                        <label>Name</label>
                        <input
                            type="text"
                            value={nameQuery}
                            onChange={e => setNameQuery(e.target.value)}
                            placeholder="Search by name"
                        />
                    </div>
                    <div className='query-input'>
                        <label>Status</label>
                        <input
                            type="text"
                            value={activeStatusQuery}
                            onChange={e => setActiveStatusQuery(e.target.value)}
                            placeholder="Search by account status"
                        />
                    </div>
                    <div className='query-input'>
                        <label>Package</label>
                        <input
                            type="text"
                            value={packageTypeQuery}
                            onChange={e => setPackageTypeQuery(e.target.value)}
                            placeholder="Search by package type"
                        />
                    </div>
                    <div className='query-input'>
                        <label>Payment</label>
                        <input
                            type="text"
                            value={paymentStatusQuery}
                            onChange={e => setPaymentStatusQuery(e.target.value)}
                            placeholder="Search by payment status"
                        />
                    </div>

                </div>

                <div className='List'>
                    {filteredMembers.map((member, idx) => {
                        return (
                            <ListItem
                                key={idx}
                                id={member._id}
                                name={member.name}
                                status={member.acc_status}
                                package={member.package_type.name}
                                amount={member.package_type.amt}
                                // paymentStatus={member.payment_status}
                                buttons={["View Details"]}
                                onClick={handleResponse}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// {filteredMembers.map(member => (
//     // Render each member component
//   ))}
