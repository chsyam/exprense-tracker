import { useState } from "react";
import "./../styles/register.css";
import axios from "axios";

const Register = (props) => {
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
        const matchedUserNames = props.users?.filter(user => user.userName === formData.userName);
        return !(matchedUserNames.length > 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {

            const response = await axios.post("http://localhost:8080/users/save",
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
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName}
                        onChange={e => handleOnChange(e)} placeholder="Enter your first name" required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName}
                        onChange={e => handleOnChange(e)}
                        placeholder="Enter your last name" required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="userName" value={formData.userName}
                        onChange={e => handleOnChange(e)}
                        placeholder="Enter your username" required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email}
                        onChange={e => handleOnChange(e)}
                        placeholder="Enter your email" required
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input type="number" name="mobileNumber" value={formData.mobileNumber} onChange={e => handleOnChange(e)}
                        placeholder="Enter your Mobile number" required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password}
                        onChange={e => handleOnChange(e)}
                        placeholder="Enter your password" required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={e => handleOnChange(e)}
                        placeholder="Re-eneter your password" required
                    />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form >
        </div>
    );
}

export default Register;