import './OperationButton.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function OperationButton({ id, name, type, color, onClick }) {

    const handleClick = () => {
        onClick(id);
    }

    const componentMapping = {
        "Add New": AddOutlinedIcon,
        "Update": EditOutlinedIcon,
        "Delete": DeleteOutlineOutlinedIcon,
        "Send": ForwardToInboxOutlinedIcon,
        "Payment Reminder": NotificationsActiveOutlinedIcon,
        "Edit Default": EditOutlinedIcon,
        "Download": FileDownloadOutlinedIcon,
        "Edit": EditOutlinedIcon
    };
    
    const renderIcon= (iconName) => {
        const Component = componentMapping[iconName];
        return <Component />
    }

    return (
        <div className={`OperationButton ${color}`} onClick={handleClick}>
            <div className='icon'>{renderIcon(name)}</div>
            <div className='data'>
                <p className='title'>{name}</p>
                <p className='sub-title'>{type}</p>
            </div>  
        </div>
    )
}