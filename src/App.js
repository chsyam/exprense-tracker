import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import History from './components/History';
import AddTransaction from './components/AddTransaction';
import axios from 'axios';
import Caclculate from './components/Calculate';
import Register from './components/Register';
import Cookies from 'js-cookie';


function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				Cookies.set("token", "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuYWdhc2FpYiIsImlhdCI6MTcxMTU2ODEyMywiZXhwIjoxNzExNjU0NTIzfQ.e533DxCHiVadvMTY9967lULycCu7YAJi7uwbTuxQPISvVJq-iW1p8VFxIRR3UMsT")
				const token = Cookies.get("token");
				const { data: response } = await axios.get('http://localhost:8080/transactions/get/all', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					}
				});
				console.log(response);
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
				const token = Cookies.get("token");
				const { data: response } = await axios.get('http://localhost:8080/users/get/all', {
					headers: {
						"Content-Type": "application/json",
						'Authorization': `Bearer ${token}`,
					}
				});
				setUsers(response);
				console.log(response);
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
			<Sidebar setRegistartionForm={setRegistartionForm} setAddButton={setAddButton} setHistoryButton={setHistoryButton} setCalculateButton={setCalculateButton} />
			<div className='content_section'>
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
		</div>
	);
}

export default App;
