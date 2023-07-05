import './Profile.css';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import Header from '../../../components/Header/Header';
import AdminForm from '../../../feature/AdminForm/AdminForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dotenv from 'react-dotenv';


export default function Profile() {
    const { accountId, accountType } = useContext(AuthContext);

    const [showForm, setShowForm] = useState(false);

    const [admin, setAdmin] = useState({
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
        fetchAdmin();
        // setStats(admin);
    }, []);

    const fetchAdmin = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+`admin/admin/${accountId}`);
            // console.log(response);
            setAdmin(response.data);
            // console.log("Admin Loaded:", response.data);
        } catch (error) {
            // console.error('Error retrieving admin:', error.response.data);
        }
    };

    const updateUser = async (accountId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/admin/${accountId}`, updatedData);
            // Handle successful response
            // console.log(response.data);
            // Refresh admin list
            fetchAdmin();
        } catch (error) {
            // console.error('Error updating admin:', error.response.data);
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
                <AdminForm
                    type="Edit"
                    details={[admin]}
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
                                {admin.name}
                                <button onClick={editProfile}><EditOutlinedIcon /></button>
                            </span>
                        </p>
                        <p className='id'>Account Id<span>{admin._id}</span></p>
                    </div>
                    <p className='username'>UserName<span>{admin.username}</span></p>
                    <div className='cols'>
                        <div className='col1'>
                            <p className='account-status'>Account Status:<span>{admin.acc_status}</span></p>
                            <p className='phone'>Phone<span>{admin.contact.phone}</span></p>

                        </div>
                        <div className='col2'>
                            <p className='account-type'>Account Type<span>{admin.acc_type}</span></p>
                            <p className='email'>Email<span>{admin.contact.email}</span></p>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}