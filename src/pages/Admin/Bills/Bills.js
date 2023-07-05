import './Bills.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Stats from '../../../components/Stats/Stats';
import OperationButton from '../../../components/Buttons/OperationButton/OperationButton';
import ListItem from '../../../components/ListItem/ListItem';
import BillForm from '../../../feature/BillForm/BillForm';

export default function Bills() {

    const [bills, setBills] = useState([]);
    const [totalBills, setTotalBills] = useState(0);
    const [activeBills, setActiveBills] = useState(0);
    const [activeButton, setActiveButton] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updatedBill, setUpdatedBill] = useState([]);
    const [formType, setFormType] = useState("");

    useEffect(() => {
        fetchBills();
    }, []);

    useEffect(() => {
        setStats(bills);
        setActiveButton([]);
    }, [bills]);

    // http://localhost:5000/admin/
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

    const addBill = async (billData) => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+'admin/bill', billData);
            // Handle successful response
            // console.log(response.data);
            // Refresh user list
            fetchBills();
        } catch (error) {
            // console.error('Error adding bill:', error.response.data);
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
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/bill/${billId}`, updatedData);
            // Handle successful response
            // console.log(response.data);

            fetchBills();
        } catch (error) {
            // console.error('Error updating bill:', error.response.data);
        }
    };

    const deleteBills = async (billId) => {
        try {
            // Remove the deleted bill from the bills list
            setBills((prevBills) => prevBills.filter((bill) => bill._id !== billId));

            const response = await axios.delete(process.env.REACT_APP_SERVER_URL+`admin/bill/${billId}`);
            // console.log(response.data);

        } catch (error) {
            // console.error('Error deleting bills:', error.response.data);
        }
    };

    const setStats = (bills) => {
        let total = 0;
        let active = 0;


        bills.map((bill) => {
            // console.log(member);
            total = total + 1;
            active = (bill.status === "pending") ? active + 1 : active;
        })

        setTotalBills(total);
        setActiveBills(active);
    }

    const stats = [
        {
            "title": "Total",
            "subTitle": "Bills",
            "value": totalBills,
            "color": "purple"
        },
        {
            "title": "Pending",
            "subTitle": "Bills",
            "value": activeBills,
            "color": "orange"
        }
    ]

    const buttons = ["Add New", "Update", "Delete"];

    const operations = [
        { "name": "Add New", "color": "green" },
        { "name": "Update", "color": "orange" },
        { "name": "Delete", "color": "red" }
    ]

    const handleResponse = (recordId, buttonIdx) => {

        if (activeButton[0] == "Delete") {
            // console.log("Delete Bill: ")
                deleteBills(recordId);
        }
        else if (activeButton[0] == "Update") {
            const foundBill = bills.find((bill) => bill._id === recordId);
            setUpdatedBill([foundBill]);
            setFormType("Update");
            setShowForm(true);
            // console.log("Bill To Be Updated:", foundBill);
        }
    }

    const handleClose = () => {
        setShowForm(false);
        setFormType("");
        setUpdatedBill([]);
        setActiveButton([]);
        // console.log("Form Closed");
    }

    const handleSubmit = (newDetails) => {
        if (formType === "Update") {
            const updatedData = {
                $set: newDetails[0]
            };
            updateBill(updatedBill[0]._id, updatedData);
            // console.log("Old Data:", updatedBill[0]);
            // console.log("New Data:", updatedData);
        }
        else {
            addBill(newDetails[0]);
            const updatedData = {
                
                    payment_status: "pending"
                
            };
            updateMember(newDetails[0].memberId, updatedData);
        }

        handleClose();
        // console.log("Form Submitted");
    }

    const handleOperation = (operationIdx) => {
        // console.log("operation selected:", operations[operationIdx].name);
        if (operations[operationIdx].name === "Add New") {
            setFormType("Add New");
            setShowForm(true);
        }
        else {
            setActiveButton([operations[operationIdx].name]);
            // console.log(operations[operationIdx].name)
        }
    }

    return (
        <div className="Bills">
            {showForm && (
                <BillForm
                    type={formType}
                    details={updatedBill}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
            <Header
                title="Bills"
            />
            <div className='body'>
                <h4 className='heading'>Overview</h4>
                <Stats
                    stats={stats}
                />
                <h4 className='heading'>Manage Bills</h4>
                <div className="ManageBills">
                    <div className='OperationButtons'>
                        {operations.map((operation, idx) => {
                            return (
                                <OperationButton
                                    key={idx}
                                    id={idx}
                                    name={operation.name}
                                    type="Bill"
                                    color={operation.color}
                                    onClick={handleOperation}
                                />
                            )
                        })}
                    </div>

                    <div className='List'>
                        {bills.map((bill, idx) => {
                            return (
                                <ListItem
                                    key={idx}
                                    id={bill._id}
                                    name={bill.memberName}
                                    status={bill.status}
                                    amount={bill.totalAmt}
                                    buttons={activeButton}
                                    onClick={handleResponse}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}