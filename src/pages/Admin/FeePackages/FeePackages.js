import './FeePackages.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import FeeCard from '../../../components/FeeCard/FeeCard';
import PackageForm from '../../../feature/PackageForm/PackageForm';
import OperationButton from '../../../components/Buttons/OperationButton/OperationButton';

export default function FeePackages() {

    const [packages, setPackages] = useState([]);
    const [activeButton, setActiveButton] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [updatedPackage, setUpdatedPackage] = useState([]);
    const [formType, setFormType] = useState("");

    useEffect(() => {
        fetchPackages();
        setActiveButton([]);
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+'admin/packages');

            // Sort members alphabetically by name
            response.data.sort((a, b) => a.name.localeCompare(b.name));

            setPackages(response.data);
            // console.log("Packages Loaded:", response.data);
            // setStats(members);
        } catch (error) {
            // console.error('Error retrieving packages:', error.response.data);
        }
    };

    const addPackage = async (packageData) => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+'admin/package', packageData);
            // Handle successful response
            // console.log(response.data);
            // Refresh user list
            fetchPackages();
        } catch (error) {
            // console.error('Error adding package:', error.response.data);
        }
    };

    const updatePackage = async (packageId, updatedData) => {
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_URL+`admin/package/${packageId}`, updatedData);
            // Handle successful response
            // console.log(response.data);

            fetchPackages();
        } catch (error) {
            // console.error('Error updating package:', error.response.data);
        }
    };

    const deletePackages = async (packageId) => {
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL+`admin/package/${packageId}`);
            // console.log(response.data);
            fetchPackages();

        } catch (error) {
            // console.error('Error deleting packages:', error.response.data);
        }
    };

    const buttons = ["Add New", "Update", "Delete"];

    const operations = [
        { "name": "Add New", "color": "green" },
        { "name": "Update", "color": "orange" },
        { "name": "Delete", "color": "red" }
    ]

    const handleOperation = (operationIdx) => {
        // console.log("operation selected:", operations[operationIdx].name);
        if (operations[operationIdx].name === "Add New") {
            setFormType("Add New");
            setShowForm(true);
        }
        else {
            setActiveButton([operations[operationIdx].name]);
            // console.log(operations[operationIdx].name)
        }
    }

    const handleResponse = (recordId, buttonIdx) => {

        if (activeButton[0] === "Delete") {
            const confirmDelete = window.confirm('Are you sure you want to delete this Package?');
            if (confirmDelete) {
                // console.log("Delete Package: ")
                deletePackages(recordId);
            }
        }
        else if (activeButton[0] === "Update") {
            const foundPackage = packages.find((item) => item._id === recordId);
            setUpdatedPackage([foundPackage]);
            setFormType("Update");
            setShowForm(true);
            // console.log("Bill To Be Updated:", foundPackage);
        }

        setActiveButton([]);
    }

    const handleClose = () => {
        setShowForm(false);
        setFormType("");
        setUpdatedPackage([]);
        setActiveButton([]);
        // console.log("Form Closed");
    }

    const handleSubmit = (newDetails) => {
        if (formType === "Update") {
            const updatedData = {
                $set: newDetails[0]
            };
            updatePackage(updatedPackage[0]._id, updatedData);
            // console.log("Old Data:", updatedPackage[0]);
            // console.log("New Data:", updatedData);
        }
        else {
            addPackage(newDetails[0]);
            // console.log("New Package Data:", newDetails[0]);
        }

        handleClose();
        // console.log("Form Submitted");
    }

    return (
        <div className="FeePackages">
            {showForm && (
                <PackageForm
                    type={formType}
                    details={updatedPackage}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
            <Header 
            title="Fee Packages"
            />
            <div className='body'>
                <h4 className='heading'>Manage Fee Packages</h4>
                <div className='OperationButtons'>
                    {operations.map((operation, idx) => {
                        return (
                            <OperationButton
                            key={idx}
                                    id={idx}
                                    name={operation.name}
                                    type="Package"
                                    color={operation.color}
                                    onClick={handleOperation}
                            />
                        )
                    })}
                </div>
                <h4 className='heading'>Fee Packages</h4>
                <div className='FeeCards'>
                    {packages.map((item, idx) => {
                        return (
                            <FeeCard
                            key={idx}
                            id={item._id}
                            title={item.name}
                            subTitle={item.tagLine}
                            amount={item.price}
                            features={item.features}
                            button={activeButton[0]}
                            onClick={handleResponse}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

