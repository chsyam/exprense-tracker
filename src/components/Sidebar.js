import "./../styles/sidebar.css";

function Sidebar(props) {
    return (
        <div className="sidebar">
            <ul>
                <li onClick={() => { props.setAddButton(true); props.setHistoryButton(false); props.setCalculateButton(false); }}>Add Transaction</li>
                <li onClick={() => { props.setAddButton(false); props.setHistoryButton(true); props.setCalculateButton(false); }}>History</li>
                <li onClick={() => { props.setAddButton(false); props.setHistoryButton(false); props.setCalculateButton(true); }}>Calculate</li>
            </ul>
        </div >
    );
}

export default Sidebar;