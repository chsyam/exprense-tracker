import "./../styles/history.css"
import { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
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


    return (
        <div>
            <div className="history">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            {/* <th>per Head</th> */}
                            <th>Date</th>
                            {/* <th>Time</th> */}
                            <th>Members Included</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.description}</td>
                                <td>{"₹ " + item.amount}</td>
                                {/* <td>
                                    {
                                        (item.users_included.length === 0) ? item.amount : item.amount / item.users_included.length
                                    }
                                </td> */}
                                <td>{item.transactionDate}</td>
                                {/* <td>{item.transactionTime}</td> */}
                                <td>
                                    {
                                        item.users_included.join(" , ")
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
