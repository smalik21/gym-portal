import './UserForm.css';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function UserForm({ type, details, onClose, onSubmit }) {
  // const [currentAccount, setCurrentAccount] = useState(1);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [accStatus, setAccStatus] = useState('active');

  useEffect(() => {
    if (type === "Update" || type === "Edit") {
      setName(details[0].name);
      setUsername(details[0].username);
      setPassword(details[0].password);
      setPhone(details[0].contact.phone);
      setEmail(details[0].contact.email);
      setAccStatus(details[0].acc_status);
    }
  }, [type, details]);

  const handleStatusChange = (e) => {
    setAccStatus(e.target.value);
  }

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDetails = {
      "name": name,
      "username": username,
      "password": password,
      "contact": {
        "phone": phone,
        "email": email
      },
      "acc_status": accStatus,
    }

    // console.log("Details:", newDetails);
    onSubmit([newDetails]);

    setName('');
    setUsername('');
    setPassword('');
    setPhone('');
    setEmail('');
    setAccStatus('');
  }

  const handlePhoneNumberKeyDown = e => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only numeric values (0-9)
    if (keyCode !== 8 && !/^[0-9]+$/.test(keyValue)) {
      e.preventDefault();
    }
  };

  const inputConfigs = [
    { label: 'Name', required: true, type: 'text', value: name, setValue: setName, disabled: type === 'Update' },
    { label: 'Username', required: true, type: 'text', value: username, setValue: setUsername, disabled: type === 'Update' },
    { label: 'Password', required: true, type: 'password', value: password, setValue: setPassword, disabled: type === 'Update' },
    { label: 'Phone', required: true, type: 'tel', value: phone, setValue: setPhone, onKeyDown: handlePhoneNumberKeyDown },
    { label: 'Email', required: false, type: 'email', value: email, setValue: setEmail },
    { label: 'Account Status', required: false, type: 'text', value: accStatus, setValue: setAccStatus },
  ];

  return (
    <div className="UserForm">
      <form className='form-container' onSubmit={handleSubmit}>
        <h1 className='form-heading'>User Form</h1>
        <div className='form-fields'>
          {inputConfigs.map((config, index) => config.label == "Account Status" ? (
            <FormControl sx={{ m: 1, minWidth: 222, zIndex: 3, margin: "0px" }} size="small">
              <InputLabel id="helper-label">Account Status</InputLabel>
              <Select
                labelId="helper-label"
                id="demo-simple-select-helper"
                value={accStatus}
                label="Account Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <TextField
              size="small"
              sx={{minWidth: 222}}
              key={index}
              required={config.required}
              id={`outlined-${config.label.toLowerCase().replace(/\s/g, '-')}-input`}
              label={config.label}
              type={config.type}
              disabled={config.disabled}
              multiline={config.multiline}
              rows={config.rows}
              value={config.value}
              onChange={e => config.setValue(e.target.value)}
              onKeyDown={config.onKeyDown}
            />
          ))}
        </div>
        <button className='submit-button' type='submit'>{type}</button>
        <button className='close-button' onClick={handleClose}><CloseOutlinedIcon /></button>
      </form>
    </div>
  )
}