import './PackageForm.css';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function PackageForm({ type, details, onClose, onSubmit }) {
    // const [currentAccount, setCurrentAccount] = useState(1);
    const [name, setName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [price, setPrice] = useState('');
    const [feature1, setFeature1] = useState('');
    const [feature2, setFeature2] = useState('');
    const [feature3, setFeature3] = useState('');
    const [feature4, setFeature4] = useState('');

    useEffect(() => {
        if (type === "Update") {
            setName(details[0].name);
            setTagLine(details[0].tagLine);
            setPrice(details[0].price);
            setFeature1(details[0].features[0] || '');
            setFeature2(details[0].features[1] || '');
            setFeature3(details[0].features[2] || '');
            setFeature4(details[0].features[3] || '');
        }

    }, [type, details]);

    // console.log("Form Type:", type);
    // console.log("Update Details:", details);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            "name": name,
            "tagLine": tagLine,
            "price": price,
            "features": [feature1, feature2, feature3, feature4]
        }

        // console.log("Details:", newDetails);
        onSubmit([newDetails]);

        setName('');
        setTagLine('');
        setPrice('');
        setFeature1('');
        setFeature2('');
        setFeature3('');
        setFeature4('');
    }

    const inputConfigs = [
        { label: 'Package Name', type: 'text', value: name, setValue: setName, required: true },
        { label: 'Package Tag Line', type: 'text', value: tagLine, setValue: setTagLine, required: true },
        { label: 'Package Price', type: 'number', value: price, setValue: setPrice, required: true },
        { label: 'Feature', type: 'text', value: feature1, setValue: setFeature1, required: true },
        { label: 'Feature', type: 'text', value: feature2, setValue: setFeature2, required: true },
        { label: 'Feature', type: 'text', value: feature3, setValue: setFeature3 },
        { label: 'Feature', type: 'text', value: feature4, setValue: setFeature4 },
      ];

    return (
        <div className="PackageForm">
            <form className='form-container' onSubmit={handleSubmit}>
                <h1 className='form-heading'>Package Form</h1>
                <div className='form-fields'>
                    {inputConfigs.map((config, index) => (
                        <TextField
                            key={index}
                            required={config.required}
                            id={`outlined-${config.label.toLowerCase().replace(/\s/g, '-')}-input`}
                            label={config.label}
                            type={config.type}
                            disabled={config.disabled}
                            value={config.value}
                            onChange={e => config.setValue(e.target.value)}
                        />
                    ))}
                </div>
                <button className='submit-button' type='submit'>{type}</button>
        <button className='close-button' onClick={handleClose}><CloseOutlinedIcon /></button>
            </form>
        </div>
    )
}