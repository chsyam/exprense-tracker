import "./../styles/history.css"
import { useState, useEffect } from "react";
import axios from "axios";
// import Cookies from "js-cookie";

const History = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuYWdhc2FpYiIsImlhdCI6MTcxMTU2MTQwNiwiZXhwIjoxNzExNjQ3ODA2fQ.xzz6RlWFVo7g8NYXshmf1kdybSnrtVCeZ4723QTpJBkZIwx1FOMwk2tBXvMK4y97";//Cookies.get('token');
                const { data: response } = await axios.get('http://localhost:8080/transactions/get/all',
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                    }
                );
                setData(response);
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);


    return (
        <div>
            <h1>History</h1>
            <div className="history">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Transaction Owner</th>
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
                                <td>{item.owner}</td>
                                <td>{item.transactionDate}</td>
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
