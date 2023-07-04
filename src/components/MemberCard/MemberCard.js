import './MemberCard.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const MemberCard = ({ member, onClose }) => {
    return (
        <div className="member-card">
            <div className="member-details">
                <h2>Member Details</h2>

                <section>
                    <h3>Personal Info</h3>
                    <div>
                        <span>Name</span> {member.name}
                    </div>
                    <div>
                        <span>Username</span> {member.username}
                    </div>
                    <div>
                        <span>Age</span> {member.age}
                    </div>
                    <div>
                        <span>Account Status</span> {member.acc_status}
                    </div>
                </section>

                <section>
                    <h3>Contact Info</h3>
                    <div>
                        <span>Phone</span> {member.contact.phone}
                    </div>
                    <div>
                        <span>Email</span> {member.contact.email}
                    </div>
                </section>

                <section>
                    <h3>Package Info</h3>
                    <div>
                        <span>Name</span> {member.package_type.name}
                    </div>
                    <div>
                        <span>Amount</span> {member.package_type.amt}
                    </div>
                    <div>
                        <span>Payment Status</span> {member.payment_status}
                    </div>
                    <div>
                        <span>Joining Date</span> {member.joining_date}
                    </div>
                </section>

                <button className='close-button' onClick={onClose}><CloseOutlinedIcon /></button>
            </div>
        </div>
    );
};

export default MemberCard;
