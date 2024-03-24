import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import History from './components/History';
import AddTransaction from './components/AddTransaction';
import axios from 'axios';
import Caclculate from './components/Calculate';
import Register from './components/Register';


function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: response } = await axios.get('http://localhost:8080/transactions/get/all', {
					headers: {
						"Content-Type": "application/json"
					}
				});
				setData(response);
			} catch (error) {
				console.error(error.message);
			}
		}
		fetchData();
	}, []);

	const [users, setUsers] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: response } = await axios.get('http://localhost:8080/users/get/all', {
					headers: {
						"Content-Type": "application/json"
					}
				});
				setUsers(response);
			} catch (error) {
				console.error(error.message);
			}
		}
		fetchData();
	}, []);

	const [registartionForm, setRegistartionForm] = useState(true);
	const [addButton, setAddButton] = useState(false);
	const [historyButton, setHistoryButton] = useState(false);
	const [calculateButton, setCalculateButton] = useState(false);
	return (
		<div>
			<Sidebar setAddButton={setAddButton} setHistoryButton={setHistoryButton} setCalculateButton={setCalculateButton} />
			{
				registartionForm && (
					<Register users={users} setRegistartionForm={setRegistartionForm} />
				)
			}
			{
				addButton && (
					<AddTransaction users={users} setHistoryButton={setHistoryButton} setAddButton={setAddButton} />
				)
			}
			{
				historyButton && (
					<History data={data} />
				)
			}
			{
				calculateButton && (
					<Caclculate data={data} users={users} />
				)
			}
		</div>
	);
}

export default App;
