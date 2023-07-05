import './MemberForm.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


export default function MemberForm({ type, details, onClose, onSubmit }) {
  // const [currentAccount, setCurrentAccount] = useState(1);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [accStatus, setAccStatus] = useState('active');
  const [age, setAge] = useState('');
  const [packageName, setPackageName] = useState('');
  const [packageAmount, setPackageAmount] = useState('');
  const [joiningDate, setJoiningDate] = useState('');

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (type === "Update" || type === "Edit") {
      setName(details[0].name);
      setUsername(details[0].username);
      setPassword(details[0].password);
      setPhone(details[0].contact.phone);
      setEmail(details[0].contact.email);
      setAccStatus(details[0].acc_status);
      setAge(details[0].age);
      setPackageName(details[0].package_type.name);
      setPackageAmount(details[0].package_type.amt);
      setJoiningDate(details[0].joining_date);
    }

    fetchPackages();
  }, [type, details]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL+'admin/packages');

      // console.log("response:", response);
      // console.log("Packages Loaded:", response.data);

      setPackages(response.data);
      // setStats(members);
    } catch (error) {
      // console.error('Error retrieving packages:', error.response.data);
    }
  };

  const handlePackageChange = (e) => {
    setPackageName(e.target.value);

    const foundPackage = packages.find((item) => item.name === e.target.value);
    setPackageAmount(foundPackage ? foundPackage.price : '');
  }

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
      "age": age,
      "package_type": {
        "name": packageName,
        "amt": packageAmount
      },
      "joining_date": joiningDate
    }

    // console.log("Details:", newDetails);
    onSubmit([newDetails]);

    setName('');
    setUsername('');
    setPassword('');
    setPhone('');
    setEmail('');
    setAccStatus('');
    setAge('');
    setPackageName('');
    setPackageAmount('');
    setJoiningDate('');
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
    { label: 'Name', required: true, type: 'text', value: name, setValue: setName, disabled: type === 'Update', className: "member-name" },
    { label: 'Username', required: true, type: 'text', value: username, setValue: setUsername, disabled: type === 'Update' },
    { label: 'Password', required: true, type: 'password', value: password, setValue: setPassword, disabled: type === 'Update' },
    { label: 'Phone', required: true, type: 'tel', value: phone, setValue: setPhone, onKeyDown: handlePhoneNumberKeyDown },
    { label: 'Email', required: false, type: 'email', value: email, setValue: setEmail },
    { label: 'Account Status', required: false, type: 'text', value: accStatus, setValue: setAccStatus },
    { label: 'Age', required: false, type: 'number', value: age, setValue: setAge, disabled: type === 'Update' },
    { label: 'Package Name', required: true, type: 'text', value: packageName, setValue: setPackageName },
    { label: 'Package Amount', required: true, type: 'number', value: packageAmount, setValue: setPackageAmount, disabled: true },
    { label: 'Joining Date', required: true, type: 'date', value: joiningDate, setValue: setJoiningDate, disabled: type === 'Update' || type === "Edit", focused: true, className: "joining-date" }
  ];

  return (
    <div className="MemberForm">
      <form className='form-container' onSubmit={handleSubmit}>
        <h1 className='form-heading'>Member Form</h1>
        <div className='form-fields'>

          {inputConfigs.map((config, index) => {
            if (config.label === "Package Name") {
              return (
                <FormControl sx={{ m: 1, minWidth: 222, zIndex: 3, margin: "0px" }} size="small">
                  <InputLabel id="select-helper-label">Package</InputLabel>
                  <Select
                    labelId="select-helper-label"
                    id="demo-simple-select-helper"
                    value={packageName}
                    label="Package"
                    onChange={handlePackageChange}
                  >
                    {packages.map((item, idx) => (
                      <MenuItem
                        key={idx}
                        value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
            }
            else if (config.label === "Account Status") {
              return (
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
              )
            }
            else {
              return (
                <TextField
                  size="small"
                  sx={{minWidth: 222}}
                  key={index}
                  className={config.className}
                  required={config.required}
                  id={`outlined-${config.label.toLowerCase().replace(/\s/g, '-')}-input`}
                  label={config.label}
                  type={config.type}
                  disabled={config.disabled}
                  helperText={config.helperText}
                  value={config.value}
                  onChange={e => config.setValue(e.target.value)}
                  onKeyDown={config.onKeyDown}
                  focused={config.focused}
                />
              )
            }
          }
          )}

        </div>
        <button className='submit-button' type='submit'>{type}</button>
        <button className='close-button' onClick={handleClose}><CloseOutlinedIcon /></button>
      </form>
    </div>
  )
}