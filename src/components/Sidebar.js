import "./../styles/sidebar.css";

function Sidebar(props) {
    return (
        <div className="sidebar">
            <div className="item" onClick={() => { props.setRegistartionForm(true); props.setAddButton(false); props.setHistoryButton(false); props.setCalculateButton(false); }}>Registration</div>
            <div className="item" onClick={() => { props.setRegistartionForm(false); props.setAddButton(true); props.setHistoryButton(false); props.setCalculateButton(false); }}>Add Transaction</div>
            <div className="item" onClick={() => { props.setRegistartionForm(false); props.setAddButton(false); props.setHistoryButton(true); props.setCalculateButton(false); }}>History</div>
            <div className="item" onClick={() => { props.setRegistartionForm(false); props.setAddButton(false); props.setHistoryButton(false); props.setCalculateButton(true); }}>Calculate</div>
        </div>
    );
}

export default Sidebar;