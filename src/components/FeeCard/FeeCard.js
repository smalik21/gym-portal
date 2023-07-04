import './FeeCard.css';
import UpdatePackageButton from '../Buttons/UpdatePackageButton/UpdatePackageButton';
import DeletePackageButton from '../Buttons/DeletePackageButton/DeletePackageButton';

export default function FeeCard(props) {

    const handleClick = () => {
        props.onClick(props.id);
    }

    const componentMapping = {
        "Update": UpdatePackageButton,
        "Delete": DeletePackageButton
    };
    
    const renderButton = (buttonName) => {
        const Component = componentMapping[buttonName];
        return <Component />
    }

    return (
        <div className='FeeCard'>
        {props.button && <div className='btn' onClick={handleClick}>{renderButton(props.button)}</div>}
            <p className='title'>{props.title}</p>
            <p className='sub-title'>{props.subTitle}</p>
            <p className='amount'>${props.amount}/<span>month</span></p>
            <div className='features'>
                {props.features.map((feature, idx) => {
                    return (
                        <p key={idx} className='feature'>{feature}</p>
                    )
                })}
            </div>
            
        </div>
    )
}