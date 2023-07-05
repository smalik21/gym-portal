import './Admins.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../AuthContext';
import Header from '../../../components/Header/Header';
import Stats from '../../../components/Stats/Stats';
import OperationButton from '../../../components/Buttons/OperationButton/OperationButton';
import ListItem from '../../../components/ListItem/ListItem';
import AdminForm from '../../../feature/AdminForm/AdminForm';

export default function Admins() {
    const { accountType } = useContext(AuthContext);

    const [admins, setAdmins] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [activeAdmins, setActiveAdmins] = useState(0);
    const [activeButton, setActiveButton] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updatedAdmin, setUpdatedAdmin] = useState([]);
    const [formType, setFormType] = useState("");

    useEffect(() => {
        fetchAdmins();
    }, []);

    useEffect(() => {
        setStats(admins);
        setActiveButton([]);
    }, [admins]);

    // http://localhost:5000/admin/
    const fetchAdmins = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+'admin/admins');

            response.data.sort((a, b) => a.name.localeCompare(b.name));

            setAdmins(response.data);
            // console.log("Admins Loaded:", response.data);
            // setStats(members);
        } catch (error) {
            // console.error('Error retrieving admins:', error.response.data);
        }
    };

    const addAdmin = async (adminData) => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+'admin/admin', adminData);
            // Handle successful response
            // console.log(response.data);
            // Refresh admins list
            fetchAdmins();
        } catch (error) {
            // console.error('Error adding admins:', error.response.data);
        }
    };

    const updateAdmin = async (adminId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/admin/${adminId}`, updatedData);
            // Handle successful response
            // console.log(response.data);
            // Refresh member list
            fetchAdmins();
        } catch (error) {
            // console.error('Error updating admins:', error.response.data);
        }
    };

    const deleteAdmins = async (adminId) => {
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL+`admin/admin/${adminId}`);
            // console.log(response.data);
            fetchAdmins();

        } catch (error) {
            // console.error('Error deleting admins:', error.response.data);
        }
    };

    const setStats = (admins) => {
        let total = 0;
        let active = 0;

        admins.map((admin) => {
            // console.log(member);
            total = total + 1;
            active = (admin.acc_status === "active") ? active + 1 : active;
        })

        setTotalAdmins(total);
        setActiveAdmins(active);
    }

    const stats = [
        {
            "title": "Total",
            "subTitle": "Admins",
            "value": totalAdmins,
            "color": "purple"
        },
        {
            "title": "Active",
            "subTitle": "Admins",
            "value": activeAdmins,
            "color": "purple"
        }
    ]

    const buttons = ["Add New", "Update", "Delete"];

    const operations = accountType === "master" ? [
        { "name": "Add New", "color": "green" },
        { "name": "Update", "color": "orange" },
        { "name": "Delete", "color": "red" }
    ] : [
        {"name": "Add New", "color": "green"}
    ];

    const handleResponse = (recordId, buttonIdx) => {

        if (activeButton[0] == "Delete") {
            // console.log("Delete Admin: ")
            deleteAdmins(recordId);
        }
        else if (activeButton[0] == "Update") {
            const foundAdmin = admins.find((admin) => admin._id === recordId);
            setUpdatedAdmin([foundAdmin]);
            setFormType("Update");
            setShowForm(true);
            // console.log("Admin To Be Updated:", foundAdmin);
        }

        setActiveButton([]);
    }

    const handleClose = () => {
        setShowForm(false);
        setFormType("");
        // console.log("Form Closed");
    }

    const handleSubmit = (newDetails) => {
        if (formType === "Update") {
            
            updateAdmin(updatedAdmin[0]._id, newDetails[0]);

        }
        else {
            addAdmin(newDetails[0]);
            // console.log("New Admin Data:", newDetails[0]);
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
            if(accountType === "master") {
                setActiveButton([operations[operationIdx].name]);
                // console.log(operations[operationIdx].name)
            }
        }
    }

    return (
        <div className="Admins">
            {showForm && (
                <AdminForm
                    type={formType}
                    details={updatedAdmin}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
            <Header
                title="Admins"
            />
            <div className='body'>
            <h4 className='heading'>Overview</h4>
            <Stats
                stats={stats}
            />

            <h4 className='heading'>Manage Admins</h4>
            <div className="ManageAdmins">
                <div className='OperationButtons'>
                    {operations.map((operation, idx) => {
                        return (
                            <OperationButton
                                key={idx}
                                id={idx}
                                name={operation.name}
                                type="Admin"
                                color={operation.color}
                                onClick={handleOperation}
                            />
                        )
                    })}
                </div>

                <div className='List'>
                    {admins.map((admin, idx) => {
                        return (
                            <ListItem
                                key={idx}
                                id={admin._id}
                                name={admin.name}
                                status={admin.acc_status}
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