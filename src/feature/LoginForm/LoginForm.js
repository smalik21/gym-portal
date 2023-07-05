import './LoginForm.css';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: '#3C3C3C',
    }
  },
});


export default function LoginForm({ onClick, onChange }) {
    const [currentAccount, setCurrentAccount] = useState("Member");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        onChange();
    }, [currentAccount, username, password]);

    const handleAccountSelect = (account) => {
        setCurrentAccount(account);
        setUsername('');
        setPassword('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic based on the selected user account
        if (currentAccount === "Admin") {
            // Login with account 1
            // console.log('Logging in with Admin Account:', username, password);
        } else if (currentAccount === "Member") {
            // Login with account 2
            // console.log('Logging in with Member Account:', username, password);
        } else {
            // Login with account 3
            // console.log('Logging in with User Account:', username, password);
        }

        // send info to Login
        onClick(currentAccount, username, password);

        setCurrentAccount('Member')
        setUsername('');
        setPassword('');
    };

    return (
        <div className="LoginForm">
            <div className='account-type'>
                <h1>Account</h1>
                <div className='account-type-buttons'>
                    <button
                        className={currentAccount === "Member" ? 'selected' : ''}
                        onClick={() => handleAccountSelect("Member")}>
                        Member
                    </button>
                    <button
                        className={currentAccount === "User" ? 'selected' : ''}
                        onClick={() => handleAccountSelect("User")}>
                        User
                    </button>
                    <button
                        className={currentAccount === "Admin" ? 'selected' : ''}
                        onClick={() => handleAccountSelect("Admin")}>
                        Admin
                    </button>
                </div>  
                

            </div>

            <form>
                <h1>Login Here</h1>
                <div className='line'></div>
                <ThemeProvider theme={theme}>
                <TextField
                    required
                    color='primary'
                    id="outlined-required"
                    label="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    size='small'
                    // fullWidth=true
                    margin='normal'
                />
                <TextField
                    required
                    color='primary'
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    size='small'
                    // fullWidth=true
                    margin='normal'
                />
                </ThemeProvider>
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}