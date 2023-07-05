import './BillForm.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function BillForm({ type, details, onClose, onSubmit }) {
    // const [currentAccount, setCurrentAccount] = useState(1);
    const [memberId, setMemberId] = useState('');
    const [memberName, setMemberName] = useState('');
    const [monthlyAmt, setMonthlyAmt] = useState('');
    const [extraAmt, setExtraAmt] = useState('');
    const [totalAmt, setTotalAmt] = useState('');
    const [status, setStatus] = useState('pending');

    const [members, setMembers] = useState([]);

    const [editable, setEditable] = useState(true);

    useEffect(() => {
        if (type === "Update") {
            setMemberId(details[0].memberId);
            setMemberName(details[0].memberName);
            setMonthlyAmt(details[0].monthlyAmt);
            setExtraAmt(details[0].extraAmt);
            setTotalAmt(details[0].totalAmt);
            setStatus(details[0].status);
            setEditable(details[0].status === "pending" ? true : false);
        }

        fetchMembers();
    }, [type, details]);

    useEffect(() => {
        const monthly = monthlyAmt === "" ? 0 : parseFloat(monthlyAmt);
        const extra = extraAmt === "" ? 0 : parseFloat(extraAmt);
        setTotalAmt(monthly + extra);
    }, [monthlyAmt, extraAmt]);

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

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
      }

    const handleMemberChange = (e) => {
        setMemberName(e.target.value);

        const foundMember = members.find((member) => member.name === e.target.value);
        setMemberId(foundMember ? foundMember._id : '');
        setMonthlyAmt(foundMember ? foundMember.package_type.amt : '');

        // console.log("Found Member:", foundMember);
    }

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            "memberId": memberId,
            "memberName": memberName,
            "monthlyAmt": monthlyAmt,
            "extraAmt": extraAmt,
            "totalAmt": totalAmt,
            "status": status,
        }

        // console.log("Details:", newDetails);
        onSubmit([newDetails]);
        setMemberId('');
        setMemberName('');
        setMonthlyAmt('');
        setExtraAmt('');
        setTotalAmt('');
        setStatus('pending');
    }

    const inputConfigs = [
        { label: 'Member Name', type: 'text', value: memberName, setValue: setMemberName, required: true, disabled: !editable || type === 'Update' },
        { label: 'Member ID', type: 'text', value: memberId, setValue: setMemberId, required: true, disabled: true },
        
        { label: 'Monthly Amount', type: 'number', value: monthlyAmt, setValue: setMonthlyAmt, required: true, disabled: true },
        { label: 'Extra Amount', type: 'number', value: extraAmt, setValue: setExtraAmt, required: false, disabled: !editable },
        { label: 'Total Amount', type: 'number', value: totalAmt, setValue: setTotalAmt, required: true, disabled: true },
        { label: 'Status', type: 'text', value: status, setValue: setStatus, required: true, disabled: !editable },
    ];

    return (
        <div className="BillForm">
            <form className='form-container' onSubmit={handleSubmit}>
                <h1 className='form-heading'>Bill Form</h1>
                <div className='form-fields'>
                    {inputConfigs.map((config, index) => {
                        if (config.label === "Member Name") {
                            return (
                                <FormControl sx={{ m: 1, minWidth: 222, zIndex: 3, margin: "0px" }} size="small" disabled={!editable || type === 'Update'}>
                                    <InputLabel id="simple-select-helper-label">Member Name</InputLabel>
                                    <Select
                                        labelId="simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={memberName}
                                        label="Member Name"
                                        onChange={handleMemberChange}
                                    >
                                        {members.map((member, idx) => (
                                            <MenuItem
                                                key={idx}
                                                value={member.name}>
                                                {member.name}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            )
                        }
                        else if (config.label === "Status") {
                            return (
                                <FormControl sx={{ m: 1, minWidth: 222, zIndex: 3, margin: "0px" }} size="small" disabled={!editable}>
                                    <InputLabel id="helper-label">Payment Status</InputLabel>
                                    <Select
                                        labelId="helper-label"
                                        id="demo-simple-select-helper"
                                        value={status}
                                        label="Payment Status"
                                        onChange={handleStatusChange}
                                    >
                                        <MenuItem value="pending">Pending</MenuItem>
                                        <MenuItem value="paid">Paid</MenuItem>
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
                                    required={config.required}
                                    id={`outlined-${config.label.toLowerCase().replace(/\s/g, '-')}-input`}
                                    label={config.label}
                                    type={config.type}
                                    disabled={config.disabled}
                                    value={config.value}
                                    onChange={e => config.setValue(e.target.value)}
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