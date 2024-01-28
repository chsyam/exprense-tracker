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

    const CalculateTotal = (userName) => {
        let total = 0;
        if (data.length === 0)
            return "Nothing"
        data.forEach((transaction) => {
            if (transaction.users_included.includes(userName)) {
                total += transaction.amount / transaction.users_included.length;
            }
        });
        return total;
    }

    return (
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
                            user.fullName !== "syamkumar ch" && (
                                <tr key={index}>
                                    <td>{user.fullName}</td>
                                    <td>{"₹ " + CalculateTotal(user.fullName)}</td>
                                </tr>
                            )
                        ))
                    }
                </tbody>
            </table>
        </div >
    );
}