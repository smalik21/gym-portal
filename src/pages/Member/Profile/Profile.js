import './Profile.css';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import Header from '../../../components/Header/Header';
import MemberForm from '../../../feature/MemberForm/MemberForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dotenv from 'react-dotenv';

export default function Profile() {
    const { accountId } = useContext(AuthContext);

    const [showForm, setShowForm] = useState(false);

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

    const updateMember = async (accountId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`member/member/${accountId}`, updatedData);
            // Handle successful response
            // console.log(response.data);
            // Refresh member list
            fetchMember();
        } catch (error) {
            // console.error('Error updating member:', error.response.data);
        }
    };

    const editProfile = () => {
        setShowForm(true);
    }

    const handleClose = () => {
        setShowForm(false);
        // console.log("Form Closed");
    }

    const handleSubmit = (newDetails) => {
       
        updateMember(accountId, newDetails[0]);

        handleClose();
        // console.log("Form Submitted");
    }

    return (
        <div className="Profile">
            {showForm && (
                <MemberForm
                    type="Edit"
                    details={[member]}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
            <Header
                title="Profile"
            />
            <div className='body'>
                <h4 className='heading'>Manage Profile</h4>

                <div className='details'>
                    <div className='info'>
                        <p className='name'>Name
                            <span>
                                {member.name}
                                <button onClick={editProfile}><EditOutlinedIcon /></button>
                            </span>
                        </p>
                        <p className='id'>Account Id<span>{member._id}</span></p>
                    </div>
                    
                    <div className='cols'>
                        <div className='col1'>
                        <p className='username'>UserName<span>{member.username}</span></p>
                            <p className='account-status'>Account Status<span>{member.acc_status}</span></p>
                            <p className='phone'>Phone<span>{member.contact.phone}</span></p>
                            <p className='package-name'>Package<span>{member.package_type.name}</span></p>

                        </div>
                        <div className='col2'>
                        <p className='joining-date'>Joining Date<span>{member.joining_date}</span></p>
                            <p className='payment-status'>Payment Status<span>{member.payment_status}</span></p>
                            <p className='email'>Email<span>{member.contact.email}</span></p>
                            <p className='package-amt'>Package Price<span>{member.package_type.amt}</span></p>
                        </div>
                    </div>
        

                </div>

            </div>
        </div>
    )
}