import './Members.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Stats from '../../../components/Stats/Stats';
import OperationButton from '../../../components/Buttons/OperationButton/OperationButton';
import ListItem from '../../../components/ListItem/ListItem';
import MemberForm from '../../../feature/MemberForm/MemberForm';

export default function Members() {

    const [members, setMembers] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [activeMembers, setActiveMembers] = useState(0);
    const [activeButton, setActiveButton] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updatedMember, setUpdatedMember] = useState([]);
    const [formType, setFormType] = useState("");

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        setStats(members);
        setActiveButton([]);
    }, [members]);

    // http://localhost:5000/admin/
    const fetchMembers = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+'admin/members');

            // Sort members alphabetically by name
            response.data.sort((a, b) => a.name.localeCompare(b.name));

            setMembers(response.data);
            // console.log("Members Loaded:", response.data);
            // setStats(members);
        } catch (error) {
            // console.error('Error retrieving members:', error.response.data);
        }
    };

    const addMember = async (memberData) => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+'admin/member', memberData);
            // Handle successful response
            // console.log(response.data);
            // Refresh member list
            fetchMembers();
        } catch (error) {
            // console.error('Error adding member:', error.response.data);
        }
    };

    const updateMember = async (memberId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/member/${memberId}`, updatedData);
            // Handle successful response
            // console.log(response.data);
            // Refresh member list
            fetchMembers();
        } catch (error) {
            // console.error('Error updating member:', error.response.data);
        }
    };

    const deleteMembers = async (memberId) => {
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL+`admin/member/${memberId}`);
            // console.log(response.data);
            fetchMembers();

        } catch (error) {
            // console.error('Error deleting members:', error.response.data);
        }
    };

    const setStats = (members) => {
        let total = 0;
        let active = 0;

        members.map((member) => {
            // console.log(member);
            total = total + 1;
            active = (member.acc_status === "active") ? active + 1 : active;
        })

        setTotalMembers(total);
        setActiveMembers(active);
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
            const confirmDelete = window.confirm('Are you sure you want to delete this Member?');
            if (confirmDelete) {
                // console.log("Delete Member: ")
                deleteMembers(recordId);
            }
        }
        else if (activeButton[0] == "Update") {
            const foundMember = members.find((member) => member._id === recordId);
            setUpdatedMember([foundMember]);
            setFormType("Update");
            setShowForm(true);
            // console.log("Member To Be Updated:", foundMember);
        }

        setActiveButton([]);
    }

    const handleClose = () => {
        setShowForm(false);
        setFormType("");
        setActiveButton([]);
        // console.log("Form Closed");
    }

    const handleSubmit = (newDetails) => {
        if (formType === "Update") {
          
            updateMember(updatedMember[0]._id, newDetails[0]);
       
        }
        else {
            addMember(newDetails[0]);
            // console.log("New Member Data:", newDetails[0]);
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
        <div className="Members">
            {showForm && (
                <MemberForm
                    type={formType}
                    details={updatedMember}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
            <Header
                title="Members"
            />
            <div className='body'>
                <h4 className='heading'>Overview</h4>
                <Stats
                    stats={stats}
                />

                <h4 className='heading'>Manage Members</h4>
                <div className="ManageMembers">
                    <div className='OperationButtons'>
                        {operations.map((operation, idx) => {
                            return (
                                <OperationButton
                                    key={idx}
                                    id={idx}
                                    name={operation.name}
                                    type="Member"
                                    color={operation.color}
                                    onClick={handleOperation}
                                />
                            )
                        })}
                    </div>

                    <div className='List'>
                        {members.map((member, idx) => {
                            return (
                                <ListItem
                                    key={idx}
                                    id={member._id}
                                    name={member.name}
                                    package={member.package_type.name}
                                    status={member.acc_status}
                                    paymentStatus={member.payment_status}
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