import { useEffect, useState } from "react"
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navigation from "./Navigation";
import { Alert, AlertTitle } from "@mui/material";
import { useFormik } from "formik";

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    
    
    
    const handleSubmitz = async (values) => {
        let something = await axios.post(
            "http://localhost:8080/register",
            {
                name: values.firstName.toLowerCase(),
                email: values.email.toLowerCase(),
                role: "user",
                pwd: values.password,
                createDt: "2024-04-16",
                bookLibrary: null,
                wishlist: null
            }
        )

        navigate("/login")
    }

    function validate(values) {
        const errors = {};
        
        if (!values.firstName) {
            errors.firstName = "First name is required"
        }

        if (!values.email) {
            errors.email = "Email address is required"
        }

        if (!values.password) {
            errors.password = "Password is required"
        } else if (values.confirmPassword !== values.password){
            errors.password = "Passwords need to match"

        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Please re-type password"
        } else if (values.confirmPassword !== values.password){
            errors.confirmPassword = "Passwords need to match"
        }

        return errors;
    }

    const {handleSubmit, handleChange, touched, errors} = useFormik({
        initialValues: {firstName: "", email: "", password: "",confirmPassword: ""},

        validate,
        // handleSubmit,
        onSubmit: handleSubmitz
    });



    return (
        <>
            <div>
                <Navigation />
            </div>
            <div>
                <h2 >Please enter your information below:</h2>
                    <form onSubmit={handleSubmit}>
                        <label>First Name:</label><br/>
                            <input type="text" name="firstName" onChange={handleChange}/><br/>
                            {touched.firstName && errors.firstName ? <div style={{color: "red"}}>{errors.firstName}</div> : null}
                        <label>Email:</label><br/>
                            <input type="text" name="email" onChange={handleChange} /><br/>
                            {touched.email && errors.email ? <div style={{color: "red"}}>{errors.email}</div> : null}
                        <label>Password:</label><br/>
                            <input type="password" name="password" onChange={handleChange}/><br/>
                            {touched.password && errors.password ? <div style={{color: "red"}}>{errors.password}</div> : null}
                        <label>Confirm Password:</label><br/>
                            <input type="password" name="confirmPassword" onChange={handleChange} /><br/>
                            {touched.confirmPassword && errors.confirmPassword ? <div style={{color: "red"}}>{errors.confirmPassword}</div> : null}
                        <button type="submit">Register Now!</button>
                    </form>
            </div>
        </>
    )
}
export default Register