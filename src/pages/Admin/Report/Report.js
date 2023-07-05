import './Report.css';
import Header from '../../../components/Header/Header';
// import ListItem from '../../../components/ListItem/ListItem';
import OperationButton from '../../../components/Buttons/OperationButton/OperationButton';

export default function Report() {

    const operations = [
        {"name": "Download", "color": "green"},
        {"name": "Edit", "color": "orange"}
    ]

    const handleOperation = (operationIdx) => {
        // console.log("operation selected:", operations[operationIdx].name);
    }

    return (
        <div className="Report">
            <Header
            title="Report"
            />
            <div className='body'>
                <h4 className='heading'>Manage Report</h4>
                <div className='OperationButtons'>
                    {operations.map((operation, idx) => {
                        return (
                            <OperationButton
                            key={idx}
                                id={idx}
                                name={operation.name}
                                type="Report"
                                color={operation.color}
                                onClick={handleOperation}
                            />
                        )
                    })}
                </div>
                <h5>Downloading Report is not available right now...</h5>
            </div>
            
        </div>
    )
}