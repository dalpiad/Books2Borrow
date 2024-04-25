import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navigation from "./Navigation";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import { Store } from 'react-notifications-component';
import { Box } from '@mui/material';

const Register = () => {
    const navigate = useNavigate();

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

        Store.addNotification({
            title: 'Success!',
            message: "Registration Sucessful!",
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            },
            onRemoval: () => navigate("/login")
            });
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
        onSubmit: handleSubmitz
    });



    return (
        <>
            <div>
                <Navigation />
            </div>
            <div>
                <h1 style={{textAlign: "center"}}>Register Below:</h1>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <form onSubmit={handleSubmit}>
                        <label>First Name:</label><br/>
                            <TextField id="outlined-basic" variant="outlined" type="text" name="firstName" onChange={handleChange}/><br/>
                            {touched.firstName && errors.firstName ? <div style={{color: "red"}}>{errors.firstName}</div> : null}
                        <label>Email:</label><br/>
                            <TextField id="outlined-basic" variant="outlined" type="text" name="email" onChange={handleChange} /><br/>
                            {touched.email && errors.email ? <div style={{color: "red"}}>{errors.email}</div> : null}
                        <label>Password:</label><br/>
                            <TextField id="outlined-basic" variant="outlined"type="password" name="password" onChange={handleChange}/><br/>
                            {touched.password && errors.password ? <div style={{color: "red"}}>{errors.password}</div> : null}
                        <label>Confirm Password:</label><br/>
                            <TextField id="outlined-basic" variant="outlined" type="password" name="confirmPassword" onChange={handleChange} /><br/>
                            {touched.confirmPassword && errors.confirmPassword ? <div style={{color: "red"}}>{errors.confirmPassword}</div> : null}<br/>
                        <Button type="submit" variant="contained" color="success"> Register Now! </Button>
                    </form>
                </Box>
                <br/>
                <div style={{textAlign: "center"}}>
                    <p>Already registered? <a href="/login">Click here</a> to login</p>
                </div>
            </div>
        </>
    )
}
export default Register