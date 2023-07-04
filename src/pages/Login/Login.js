import './Login.css';
import axios from 'axios';
import LoginForm from '../../feature/LoginForm/LoginForm';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import Alert from '@mui/material/Alert';

export default function Login({ onLogin }) {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');

    const handleLogin = async (accountType, username, password) => {
        console.log("Login Request:", accountType, username, password);

        try {
            const response = await axios.post('/login', { accountType, username, password });

            console.log("Response:", response.data);
            const isAuthenticated = response.data.isAuthenticated;
            const accountId = response.data.accountId;
            const adminType = response.data.accountType;

            if (isAuthenticated) {
                onLogin(accountType);
                login(accountId, adminType);
                console.log("login:", accountId, adminType);
            }

            setError('');

        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid Credentials');
        }
    }

    return (
        <div className="Login">
            <h1 className='header'>GYM PORTAL</h1>
            <LoginForm
                onChange={() => setError('')}
                onClick={handleLogin}
            />

            <div className='alert'>
                {error &&
                    <Alert severity="error">{error}</Alert>
                }
            </div>

        </div>
    )
}
