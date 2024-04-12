import { useEffect, useState } from "react"
import ReactDOM from 'react-dom/client';





const Register = () => {

    const [inputs, setInputs] = useState("");
     // This variable determines whether password is shown or not
    const [isShown, setIsSHown] = useState(false);

  // This function is called when the checkbox is checked or unchecked
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
    }

    useEffect(() => {
        fetch("http://localhost:8080/register")
        .then(response => response.text())
        .then(thing => console.log(thing))
    }, [])
    console.log("Gir is Bad!")




    return (
        <div>
        <h1>Registration Form</h1>

                <form onSubmit={handleSubmit}>
                    <label>First Name:</label><br></br>
                        <input type="text" name="firstName" value={inputs.firstName || ""} onChange={handleChange} /><br></br>
                    <label>Zip Code:</label><br></br>
                        <input type="text" name="zipCode" value={inputs.zipCode || ""} onChange={handleChange} /><br></br>
                    <label>Email:</label><br></br>
                        <input type="text" name="email" value={inputs.email || ""} onChange={handleChange} /><br></br>
                    <label>Password:</label><br></br>
                        <input type={isShown ? "text" : "password"} name="password" value={inputs.password || ""} onChange={handleChange} /><br></br>
                    <input type="submit" />
                </form>
                </div>
    )
}

export default Register





























// import React, { useState } from 'react'; 
// // import axios from 'axios'; 
// import Navigation from './Navigation'
// import { Form, useNavigate } from 'react-router-dom'; // Import useHistory hook 
// // // import { 
// //     MDBContainer, 
// //     MDBInput, 
// //     MDBBtn, 
// // } from 'mdb-react-ui-kit'; 
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import SearchBar from './SearchBar';
// import TextField from "@mui/material/TextField";

// function RegistrationPage() { 
//     const [firstName, setFirstName] = useState(''); 
//     const [email, setEmail] = useState(''); 
//     const [password, setPassword] = useState(''); 
//     const [confirmPassword, setConfirmPassword] = useState(''); 
//     const [role, setRole] = useState('ROLE_CUSTOMER'); 
//     const [zipCode, setZipCode] = useState(''); 
//     const [error, setError] = useState(''); // State to manage error messages 
//     const history = useNavigate(); // Get the history object for redirection 
  
//     const handleSignup = async () => { 
//         try { 
//             // Check for empty fields 
//             if (!firstName || !email || !password || !confirmPassword || !zipCode) { 
//                 setError('Please fill in all fields.'); 
//                 return; 
//             } 
  
//             if (password !== confirmPassword) { 
//                 throw new Error("Passwords do not match"); 
//             } 
  
//             const response = await axios.post('http://localhost:8080/register', { 
//                 fullName, 
//                 email, 
//                 password, 
//                 role, 
//                 zipCode 
//             }); 
//             // Handle successful signup 
//             console.log(response.data); 
//             history('/dashboard'); 
//         } catch (error) { 
//             // Handle signup error 
//             console.error('Signup failed:', error.response ? error.response.data : error.message); 
//             setError(error.response ? error.response.data : error.message); 
//         } 
//     }; 
  
//     return ( 
//         <div className="d-flex justify-content-center align-items-center vh-100"> 
//             <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}> 
//                 <Form className="p-3"> 
//                     <h2 className="mb-4 text-center">Register</h2> 
//                     {/* Render error message if exists */} 
//                     {error && <p className="text-danger">{error}</p>} 
//                     <input wrapperClass='mb-3' id='firstName' placeholder={"First Name"} value={firstName} type='text'
//                               onChange={(e) => setFirstName(e.target.value)}/> 
//                     <input wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email'
//                               onChange={(e) => setEmail(e.target.value)}/> 
//                     <input wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} 
//                               onChange={(e) => setPassword(e.target.value)}/> 
//                     <input wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password'
//                               value={confirmPassword} 
//                               onChange={(e) => setConfirmPassword(e.target.value)}/> 
  
  
//                     <input wrapperClass='mb-2' placeholder='Zipcode' id='zipCode' value={zipCode} 
//                               type='text'
//                               onChange={(e) => setZipCode(e.target.value)}/> 
//                     <label className="form-label mb-1">Role:</label> 
//                     <select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}> 
//                         <option value="ROLE_CUSTOMER">User</option> 
//                         <option value="ROLE_ADMIN">Admin</option> 
//                     </select> 
//                     <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
//                             style={{height: '40px', width: '100%'}} 
//                             onClick={handleSignup}>Register 
//                     </button> 
  
//                     <div className="text-center"> 
//                         <p>Already Registerd? <a href="/">Login</a></p> 
//                     </div> 
  
//                 </Form> 
//             </div> 
//         </div> 
//     ); 
// } 
  
// export default RegistrationPage; 
