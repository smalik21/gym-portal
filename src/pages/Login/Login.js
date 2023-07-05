import './Login.css';
import axios from 'axios';
import LoginForm from '../../feature/LoginForm/LoginForm';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(account, username, password) {
    return { account, username, password };
}

const rows = [
    createData('Member', 'member', 'member'),
    createData('User', 'user', 'user'),
    createData('Admin', 'admin', 'admin'),
];


export default function Login({ onLogin }) {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');

    const handleLogin = async (accountType, username, password) => {
        // console.log("Login Request:", accountType, username, password);
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + 'login', { accountType, username, password });

            // console.log("Response:", response.data);
            const isAuthenticated = response.data.isAuthenticated;
            const accountId = response.data.accountId;
            const adminType = response.data.accountType;

            if (isAuthenticated) {
                onLogin(accountType);
                login(accountId, adminType);
                // console.log("login:", accountId, adminType);
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

            <div className='help-section'>
                <h5>Sample Accounts</h5>
                <TableContainer component='div'>
                    <Table sx={{ minWidth: 200, backgroundColor: 'grey', opacity: 0.7 }} aria-label="simple table" size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Account</TableCell>
                                <TableCell align="right">UserName</TableCell>
                                <TableCell align="right">Password</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.account}
                                    </TableCell>
                                    <TableCell align="right">{row.username}</TableCell>
                                    <TableCell align="right">{row.password}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
