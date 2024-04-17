import { useEffect, useState } from "react"
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        let something = await axios.post(
            "http://localhost:8080/register",
            {
                name: event.target.firstName.value,
                email: event.target.email.value,
                role: "user",
                pwd: event.target.password.value,
                createDt: "2024-04-16",
                bookLibrary: null,
                wishlist: null
            }
        )
        console.log(something.data)
        navigate("/")
    }
    return (
        <div>
            <h1>Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label><br/>
                        <input type="text" name="firstName" /><br/>
                    <label>Email:</label><br/>
                        <input type="text" name="email" /><br/>
                    <label>Password:</label><br/>
                        <input name="password" /><br/>
                    <input type="submit" />
                </form>
        </div>
    )
}
export default Register