import './BillReceiptCard.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function BillReceiptCard({ id, memberId, memberName, monthlyAmt, extraAmt, totalAmt, status, onPay, onClose }) {

  const handlePay = () => {
    if(status === "pending") {
      onPay(id, 1);
    }
    else {
      // console.log("Bill Already Paid.");
    }
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <div className="BillReceiptCard">
      <div className="bill-details">
      <h2>Bill Receipt</h2>
        <section>
        <div className='id'>
            <span>Bill ID</span> {id}
          </div>
          <div className='id'>
            <span>Member ID</span> {memberId}
          </div>
          <div>
            <span>Member Name</span> {memberName}
          </div>
          <div>
            <span>Monthly Amount</span> ${monthlyAmt}
          </div>
          <div>
            <span>Extra Amount</span> ${extraAmt || 0}
          </div>
          <div>
            <span>Total Amount</span> ${totalAmt}
          </div>
          <div>
            <span>Status</span> {status}
          </div>
        </section>


          <button className={`pay-button ${status}`} onClick={handlePay}>{status === "pending" ? "Pay" : "Paid"}</button>
          <button className={`close-button`} onClick={handleClose}><CloseOutlinedIcon /></button>

      </div>
    </div>
  );
};

