import "./../styles/calculate.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Calculation(props) {

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

    const [owner, setOwner] = useState("syamkumar ch")

    const handleChange = (e) => {
        setOwner(e.target.value);
    }

    const CalculateTotal = (userName, ownerName) => {
        let total = 0;
        if (data.length === 0)
            return "Nothing"
        data.forEach((transaction) => {
            if (transaction.owner === ownerName && transaction.users_included.includes(userName)) {
                total += transaction.amount / transaction.users_included.length;
            }
        });
        return total;
    }

    return (
        <div className="section">
            <span>Whose Amount should be calculate? <h1>{owner}</h1></span>
            <select value={owner} onChange={handleChange}>
                {props.users.map((user, index) => (
                    <option value={user.userName} key={index}>
                        {user.userName}
                    </option>
                ))}
            </select>
            <div className="calculate">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.users.map((user, index) => (
                                user.userName !== owner && (
                                    <tr key={index}>
                                        <td>{user.userName}</td>
                                        <td>{"₹ " + CalculateTotal(user.userName, owner)}</td>
                                    </tr>
                                )
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}