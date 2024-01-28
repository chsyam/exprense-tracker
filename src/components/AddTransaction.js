import React, { useState } from "react";
import "./../styles/addTransaction.css";
import axios from "axios";

function AddTransaction(props) {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [checked, setChecked] = useState([]);

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + "," + item;
        })
        : "";

    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (amount !== 0 && checkedItems.length !== 0 && description.length > 2) {
            try {
                const users_included = [];
                checkedItems.split(",").forEach(item => {
                    users_included.push(item.trim());
                })

                console.log(users_included);
                const response = await axios.post('http://localhost:8080/transactions/save', {
                    "amount": amount, "description": description, "users_included": users_included
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        props.setHistoryButton(true);
        props.setAddButton(false);
    }

    return (
        <div>
            <h1>Add Transaction</h1>
            <form className="form" onSubmit={(event) => handleSubmit(event)}>
                <div className="form-div">
                    <table>
                        <tbody>
                            <tr>
                                <td>Amount</td>
                                <td>
                                    <input className="amount" type="number" onChange={(event) => setAmount(event.target.value)} placeholder="enter amount" required />
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea className="description" required rows="3" cols="20" type="text" onChange={(event) => setDescription(event.target.value)} placeholder="amount description" />
                                </td>
                            </tr>
                            <tr className="checkList">
                                <td>Members</td>
                                <td className="list-container">
                                    {props.users.map((item, index) => (
                                        <div className="" key={index}>
                                            <input className="checkbox" id={index} value={item.fullName} type="checkbox" onChange={handleCheck} />
                                            <label htmlFor={index} className={isChecked(item.fullName)}>{item.fullName}</label>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr className="members">
                                <td colSpan="2" className="checkedItems">
                                    {checkedItems}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="buttons">
                        <input type="reset" className="cancel" value="Cancel" />
                        <input type="submit" className="submit" value="Submit" />
                    </div>
                </div>
            </form >
        </div >
    );
}

export default AddTransaction;