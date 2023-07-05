import './Profile.css';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import Header from '../../../components/Header/Header';
import UserForm from '../../../feature/UserForm/UserForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dotenv from 'react-dotenv';

export default function Profile() {
    const { accountId } = useContext(AuthContext);

    const [showForm, setShowForm] = useState(false);

    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        contact: {
            phone: '',
            email: ''
        },
        acc_status: '',
    });

    useEffect(() => {
        fetchUser();
        // setStats(user);
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+`user/user/${accountId}`);
            // console.log(response);
            setUser(response.data);
            // console.log("User Loaded:", response.data);
        } catch (error) {
            // console.error('Error retrieving user:', error.response.data);
        }
    };

    const updateUser = async (accountId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`user/user/${accountId}`, updatedData);
            // Handle successful response
            // console.log(response.data);
            // Refresh user list
            fetchUser();
        } catch (error) {
            // console.error('Error updating user:', error.response.data);
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
      
        updateUser(accountId, newDetails[0]);

        handleClose();
        // console.log("Form Submitted");
    }

    return (
        <div className="Profile">
            {showForm && (
                <UserForm
                    type="Edit"
                    details={[user]}
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
                                {user.name}
                                <button onClick={editProfile}><EditOutlinedIcon /></button>
                            </span>
                        </p>
                        <p className='id'>Account Id<span>{user._id}</span></p>
                    </div>
                    <p className='username'>UserName<span>{user.username}</span></p>
                    <div className='cols'>
                        <div className='col1'>
                            <p className='account-status'>Account Status:<span>{user.acc_status}</span></p>
                            <p className='phone'>Phone<span>{user.contact.phone}</span></p>

                        </div>
                        <div className='col2'>
                            <p className='account-type'>Account Type<span>User</span></p>
                            <p className='email'>Email<span>{user.contact.email}</span></p>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}