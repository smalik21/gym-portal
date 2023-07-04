import React, { useState, useEffect } from 'react';
import './ListItem.css';
import ViewDetailsButton from '../Buttons/ViewDetailsButton/ViewDetailsButton';
import UpdateButton from '../Buttons/UpdateButton/UpdateButton';
import DeleteButton from '../Buttons/DeleteButton/DeleteButton';
import SendNotificationButton from '../Buttons/SendNotificationButton/SendNotificationButton';
import SendReminderButton from '../Buttons/SendReminderButton/SendReminderButton';
import PayButton from '../Buttons/PayButton/PayButton';
import CloseButton from '../Buttons/CloseButton/CloseButton';

export default function ListItem(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (event) => {
    props.onClick(props.id, event.target.id);
  };

  const componentMapping = {
    "View Details": ViewDetailsButton,
    "Update": UpdateButton,
    "Delete": DeleteButton,
    "Send": SendNotificationButton,
    "Payment Reminder": SendReminderButton,
    "Close": CloseButton,
    "View": ViewDetailsButton,
    "Pay": PayButton
};

const renderButton = (buttonName) => {
    const Component = componentMapping[buttonName];
    return <Component />
}

  return (
    <div className="ListItem">
      <p className="name">{props.name}</p>
      {windowWidth >= 660 && props.status && <p className='status'>Status: {props.status}</p>}
      {windowWidth >= 768 && props.package && <p className='package'>{props.package}</p>}
      {windowWidth >= 768 && props.paymentStatus && <p className='pay-status'>Payment Status: {props.paymentStatus}</p>}
      {windowWidth >= 660 && props.amount && <p className='amount'>${props.amount}</p>}
      {windowWidth >= 768 && props.description && <p className='description'>{props.description}</p>}
      {props.buttons.map((button, idx) => (
        <div key={idx} id={idx} onClick={handleClick}>
          {renderButton(button)}
        </div>
      ))}
    </div>
  );
}
