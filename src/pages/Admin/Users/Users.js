import './Users.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Stats from '../../../components/Stats/Stats';
import OperationButton from '../../../components/Buttons/OperationButton/OperationButton';
import ListItem from '../../../components/ListItem/ListItem';
import UserForm from '../../../feature/UserForm/UserForm';
import dotenv from 'react-dotenv';

export default function Users() {

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [activeButton, setActiveButton] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updatedUser, setUpdatedUser] = useState([]);
    const [formType, setFormType] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setStats(users);
        setActiveButton([]);
    }, [users]);

    // http://localhost:5000/admin/
    const fetchUsers = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+'admin/users');

            // Sort members alphabetically by name
            response.data.sort((a, b) => a.name.localeCompare(b.name));

            setUsers(response.data);
            console.log("Users Loaded:", response.data);
            // setStats(members);
        } catch (error) {
            console.error('Error retrieving users:', error.response.data);
        }
    };

    const addUser = async (userData) => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+'admin/user', userData);
            // Handle successful response
            console.log(response.data);
            // Refresh user list
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error.response.data);
        }
    };

    const updateUser = async (userId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/user/${userId}`, updatedData);
            // Handle successful response
            console.log(response.data);
            // Refresh member list
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error.response.data);
        }
    };

    const deleteUsers = async (userId) => {
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL+`admin/user/${userId}`);
            console.log(response.data);
            fetchUsers();

        } catch (error) {
            console.error('Error deleting users:', error.response.data);
        }
    };

    const setStats = (users) => {
        let total = 0;
        let active = 0;

        users.map((user) => {
            // console.log(member);
            total = total + 1;
            active = (user.acc_status === "active") ? active + 1 : active;
        })

        setTotalUsers(total);
        setActiveUsers(active);
    }

    const stats = [
        {
            "title": "Total",
            "subTitle": "Users",
            "value": totalUsers,
            "color": "purple"
        },
        {
            "title": "Active",
            "subTitle": "Users",
            "value": activeUsers,
            "color": "purple"
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
            const confirmDelete = window.confirm('Are you sure you want to delete this User?');
            if (confirmDelete) {
                console.log("Delete User: ")
                deleteUsers(recordId);
            }
        }
        else if (activeButton[0] == "Update") {
            const foundUser = users.find((user) => user._id === recordId);
            setUpdatedUser([foundUser]);
            setFormType("Update");
            setShowForm(true);
            console.log("User To Be Updated:", foundUser);
        }

        setActiveButton([]);
    }

    const handleClose = () => {
        setShowForm(false);
        setFormType("");
        setActiveButton([]);
        console.log("Form Closed");
    }

    const handleSubmit = (newDetails) => {
        if (formType === "Update") {
            
            updateUser(updatedUser[0]._id, newDetails[0]);
       
        }
        else {
            addUser(newDetails[0]);
            console.log("New User Data:", newDetails[0]);
        }

        handleClose();
        console.log("Form Submitted");
    }

    const handleOperation = (operationIdx) => {
        console.log("operation selected:", operations[operationIdx].name);
        if (operations[operationIdx].name === "Add New") {
            setFormType("Add New");
            setShowForm(true);
        }
        else {
            setActiveButton([operations[operationIdx].name]);
            console.log(operations[operationIdx].name)
        }
    }

    return (
        <div className="Users">
            {showForm && (
                <UserForm
                    type={formType}
                    details={updatedUser}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
            <Header
                title="Users"
            />
            <div className='body'>
            <h4 className='heading'>Overview</h4>
            <Stats
                stats={stats}
            />

            <h4 className='heading'>Manage Users</h4>
            <div className="ManageUsers">
                <div className='OperationButtons'>
                    {operations.map((operation, idx) => {
                        return (
                            <OperationButton
                                key={idx}
                                id={idx}
                                name={operation.name}
                                type="User"
                                color={operation.color}
                                onClick={handleOperation}
                            />
                        )
                    })}
                </div>

                <div className='List'>
                    {users.map((user, idx) => {
                        return (
                            <ListItem
                                key={idx}
                                id={user._id}
                                name={user.name}
                                status={user.acc_status}
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