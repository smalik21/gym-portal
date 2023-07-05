import './Notifications.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import ListItem from '../../../components/ListItem/ListItem';
import OperationButton from '../../../components/Buttons/OperationButton/OperationButton';
import NotificationForm from '../../../feature/NotificationForm/NotificationForm';

export default function Notifications() {

    const [members, setMembers] = useState([]);
    // const [totalMembers, setTotalMembers] = useState(0);
    // const [activeMembers, setActiveMembers] = useState(0);
    const [activeButton, setActiveButton] = useState([]);

    const [messageId, setMessageId] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [paymentReminder, setPaymentReminder] = useState('');
    const [showForm, setShowForm] = useState(false);
    // const [updatedMember, setUpdatedMember] = useState([]);
    // const [formType, setFormType] = useState("");

    useEffect(() => {
        fetchMembers();
        fetchMessages();
        setActiveButton([]);
    }, []);

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

    const updateMembers = async (memberId, newNotification) => {
        try {
            // console.log("new notification:", newNotification);
          const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/member/${memberId}/notifications`, {"notification": newNotification});
        //   console.log(response.data);
          fetchMembers();
          // Handle success or perform any necessary actions
        } catch (error) {
        //   console.error('Error updating notifications:', error.response.data);
          // Handle error or display an error message
        }
      };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+'admin/notification');

            setCustomMessage(response.data[0].customMessage);
            setPaymentReminder(response.data[0].paymentReminder);
            setMessageId(response.data[0]._id);

            // console.log("Messages Loaded:", response.data);

        } catch (error) {
            // console.error('Error retrieving messages:', error.response.data);
        }
    };

    const updateMessages = async (messageId, newMessage) => {
        try {
          const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/notification/${messageId}`, newMessage);
        //   console.log(response.data);
          fetchMessages();
          // Handle success or perform any necessary actions
        } catch (error) {
        //   console.error('Error updating messages:', error.response.data);
          // Handle error or display an error message
        }
      };


    const buttons = ["Send", "Payment Reminder", "Edit Default"];

    const operations = [
        {"name": "Send", "color": "green"},
        {"name": "Payment Reminder", "color": "purple"},
        {"name": "Edit Default", "color": "orange"},
    ]

    const handleResponse = (recordId, buttonIdx) => {

        const foundMember = members.find((member) => member._id === recordId);

        if(activeButton[0] == "Send") {
            // Send the custom Message
            const data = {
                "type": "Message",
                "content": customMessage
            }
            updateMembers(foundMember._id, data);
        }
        else if(activeButton[0] == "Payment Reminder") {
            // Send Payment Reminder
            const data = {
                "type": "Payment Reminder",
                "content": paymentReminder
            }
            updateMembers(foundMember._id, data);
        }
    }

    const handleClose = () => {
        setShowForm(false);
        setActiveButton([]);
        // console.log("Form Closed");
    }

    // handle Custom Message Change
    const handleSubmit = (newCustomMessage, newPaymentReminder) => {

        const newMessage = {
            "customMessage": newCustomMessage,
            "paymentReminder": newPaymentReminder
        }

        updateMessages(messageId, newMessage);

        handleClose();
        // console.log("Form Submitted");
    }

    const handleOperation = (operationIdx) => {
        // console.log("operation selected:", operations[operationIdx].name);
        if(operations[operationIdx].name === "Edit Default") {
            // setFormType("Edit Custom");
            setShowForm(true);
        }
        else {
            setActiveButton([operations[operationIdx].name]);
            // console.log(operations[operationIdx].name)
        }
    }

    return (
        <div className="Notifications">
            {showForm && (
                <NotificationForm
                customMessage={customMessage}
                paymentReminder={paymentReminder}
                onClose={handleClose}
                onSubmit={handleSubmit}
                />
            )}
            <Header
            title="Notifications"
            />
            <div className='body'>
                <h4 className='heading'>Manage Notifications</h4>
                <div className='OperationButtons'>
                    {operations.map((operation, idx) => {
                        return (
                            <OperationButton
                                key={idx}
                                id={idx}
                                name={operation.name}
                                type="Notification"
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
                            // package={member.package_type.name}
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
    )
}