import './StatCard.css';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

export default function StatCard({ title, subTitle, value, color}) {

    const componentMapping = {
        "TotalMembers": GroupsOutlinedIcon,
        "TotalUsers": GroupsOutlinedIcon,
        "TotalBills": GroupsOutlinedIcon,
        "TotalAdmins": GroupsOutlinedIcon,
        "ActiveMembers": PeopleAltOutlinedIcon,    
        "ActiveUsers": PeopleAltOutlinedIcon,
        "ActiveAdmins": PeopleAltOutlinedIcon,
        "PendingBills": WarningAmberOutlinedIcon,
        "PendingPayments": WarningAmberOutlinedIcon,
        "MonthlyEarnings": CalendarMonthOutlinedIcon,
        "TotalEarnings": AccountBalanceOutlinedIcon,
        "AccountStatus": AutorenewIcon,
        "MonthlyPayment": AttachMoneyIcon,
        "FeePackage": CreditCardOutlinedIcon,
        "PaymentStatus": SellOutlinedIcon

    };
    
    const renderIcon = () => {
        const cardName = title + subTitle;
        // console.log(cardName, "Color:", color);
        const Component = componentMapping[cardName];
        return <Component />
    }

    return (
        <div className={`StatCard ${color}`}>
            <div className='icon'>{renderIcon()}</div>
            <div className='data'>
                <p className='title'>{title}</p>
                <p className='sub-title'>{subTitle}</p>
                <p className='value'>{value}</p>
            </div>    
        </div>
    )
}