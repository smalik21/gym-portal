import './PaymentHistory.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../AuthContext';
import Header from '../../../components/Header/Header';
import ListItem from '../../../components/ListItem/ListItem';
// import BillForm from '../../../feature/BillForm/BillForm';
import BillReceiptCard from '../../../components/BillReceiptCard/BillReceiptCard';

export default function PaymentHistory() {
    const { accountId } = useContext(AuthContext);

    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchBills();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPaymentStatus();
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };

    }, [bills]);

    const fetchBills = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+`member/bills/${accountId}`);
            // response.data.sort((a, b) => a.memberName.localeCompare(b.memberName));

            setBills(response.data);
            // console.log("Bills Loaded:", response.data);
            // setStats(members);
        } catch (error) {
            // console.error('Error retrieving bills:', error.response.data);
        }
    };

    const updateMember = async (memberId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/member/${memberId}`, updatedData);
            // Handle successful response
            // console.log(response.data);
            // Refresh member list
        } catch (error) {
            // console.error('Error updating member:', error.response.data);
        }
    };

    const updateBill = async (billId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`member/bill/${billId}`, updatedData);
            // Handle successful response
            // console.log(response.data);

            fetchBills();
        } catch (error) {
            // console.error('Error updating bill:', error.response.data);
        }
    };

    const setPaymentStatus = () => {
        const foundPendingBill = bills.find((bill) => bill.status === "pending");
        if (foundPendingBill) {
            // console.log("Found Pending Bills");
            const updatedMemberData = {
               
                    payment_status: "pending"
               
            };
            updateMember(accountId, updatedMemberData);
        }
        else {
            const updatedMemberData = {
               
                    payment_status: "paid"
            
            };
            updateMember(accountId, updatedMemberData);
            // console.log("Member's Payment Status Updated.");
        }
    }

    const buttons = ["View", "Pay"];
    const justView = ["View"];

    const handleResponse = (billId, buttonIdx) => {

        // console.log("response:", buttonIdx);
        if (buttons[buttonIdx] === "Pay") {
            const updatedData = {
                $set: {
                    status: "paid"
                }
            };
            updateBill(billId, updatedData);

            setSelectedBill({});
            setShowForm(false);
        }
        else {
            const selected = bills.find((bill) => bill._id === billId);
            setSelectedBill(selected);
            // console.log("Selected Bill:", selected);
            setShowForm(true);

        }
    }

    const handleClose = () => {
        setShowForm(false);
        setSelectedBill({});
    }

    return (
        <div className="PaymentHistory">
            {showForm && (
                <BillReceiptCard
                    id={selectedBill._id}
                    memberId={selectedBill.memberId}
                    memberName={selectedBill.memberName}
                    monthlyAmt={selectedBill.monthlyAmt}
                    extraAmt={selectedBill.extraAmt}
                    totalAmt={selectedBill.totalAmt}
                    status={selectedBill.status}
                    onPay={handleResponse}
                    onClose={handleClose}
                />
            )}
            <Header
                title="Payment History"
            />
            <div className='body'>
                <h4 className='heading'>Manage Bills</h4>
                <div className='List'>
                    {bills.map((bill, idx) => {
                        return (
                            <ListItem
                                key={idx}
                                id={bill._id}
                                name={"$" + bill.totalAmt}
                                package={"Monthly: $" + bill.monthlyAmt}
                                paymentStatus={bill.status}
                                buttons={bill.status === "pending" ? buttons : justView}
                                onClick={handleResponse}
                            />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}