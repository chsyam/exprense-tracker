import { useEffect, useState } from "react";
import "./../styles/register.css";
import axios from "axios";
import Cookies from 'js-cookie';

const Register = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const LoginTest = async () => {
            try {
                const response = await axios.post("http://localhost:8082/login", {
                    "username": "nagasaib",
                    "password": "123456"
                });
                if (response.status === 200) {
                    const token = response.data.token;
                    Cookies.set('token', token, { expires: 24 });
                }
            } catch (error) {
                console.log(error)
            }
        }
        LoginTest();
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

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    })

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const matchedUserNames = users?.filter(user => user.userName === formData.userName);
        return !(matchedUserNames.length > 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {

            const response = await axios.post("http://localhost:8081/users/save",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            if (response.status === 200) {
                console.log("User registered successfully", formData);
            } else {
                console.log("Error registering user", formData);
                console.log(response);
            }
        }
        else {
            alert("User with same username already exists");
            console.log("Form data is invalid", formData);
        }
    }

    return (
        <div className="registartion-form">
            <form onSubmit={(e) => handleSubmit(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>First Name:</label> </td>
                            <td>
                                <input type="text" name="firstName" value={formData.firstName}
                                    onChange={e => handleOnChange(e)} placeholder="Enter your first name" required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Last Name:</label></td>
                            <td>
                                <input type="text" name="lastName" value={formData.lastName}
                                    onChange={e => handleOnChange(e)}
                                    placeholder="Enter your last name" required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Username:</label></td>
                            <td>
                                <input type="text" name="userName" value={formData.userName}
                                    onChange={e => handleOnChange(e)}
                                    placeholder="Enter your username" required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td>
                                <input type="email" name="email" value={formData.email}
                                    onChange={e => handleOnChange(e)}
                                    placeholder="Enter your email" required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Mobile Number:</label></td>
                            <td>
                                <input type="number" name="mobileNumber" value={formData.mobileNumber} onChange={e => handleOnChange(e)}
                                    placeholder="Enter your Mobile number" required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td>
                                <input type="password" name="password" value={formData.password}
                                    onChange={e => handleOnChange(e)}
                                    placeholder="Enter your password" required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Confirm Password:</label></td>
                            <td>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={e => handleOnChange(e)}
                                    placeholder="Re-eneter your password" required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="Submit" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Register;