import './NotificationForm.css';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function NotificationForm({ customMessage, paymentReminder, onClose, onSubmit }) {
    const [custom_message, setCustomMessage] = useState('');
    const [payment_reminder, setPaymentReminder] = useState('');

    useEffect(() => {
        setCustomMessage(customMessage);
        setPaymentReminder(paymentReminder);
    }, [customMessage, paymentReminder]);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(custom_message, payment_reminder);
        // console.log("Form Data:");
        // console.log("CustomMessage:", custom_message, "PaymentReminder", payment_reminder);

        setCustomMessage('');
        setPaymentReminder('');
    }

    return (
        <div className="NotificationForm">
            <form className='form-container' onSubmit={handleSubmit}>
                <h1 className='form-heading'>Notification Form</h1>
                <TextField
                    required
                    size='small'
                    id={`outlined-custom_message-input`}
                    label="Custom Message"
                    type="text"
                    value={custom_message}
                    onChange={e => setCustomMessage(e.target.value)}
                    multiline
                    maxRows={4}
                    fullWidth="true"
                />
                <TextField
                    required
                    size='small'
                    id={`outlined-payment_reminder-input`}
                    label="Payment Reminder Message"
                    type="text"
                    value={payment_reminder}
                    onChange={e => setPaymentReminder(e.target.value)}
                    multiline
                    maxRows={4}
                    fullWidth="true"
                />
                <button className='submit-button' type='submit'>Submit</button>
        <button className='close-button' onClick={handleClose}><CloseOutlinedIcon /></button>
            </form>
        </div>
    )
}