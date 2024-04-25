import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from '@mui/material';
import { Store } from 'react-notifications-component';

function LoginForm() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] =useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authToken = btoa(`${email}:${password}`);
        try {

        if (!email || !password) {
            setError('Please fill in all fields');
            return
        }

            const response = await axios.get('http://localhost:8080/user', {
                headers: {
                    'Authorization': `Basic ${authToken}`
                }
            });

            const authHeader = response.headers['authorization'];

            if (authHeader) {
                localStorage.setItem('jwt', authHeader);
                console.log('JWT saved to local storage:');
            } else {
                setError('Error logging in. Please try again')
                console.error('Authorization header is missing or improperly formatted.');
                return
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('Response status:', error.response ? error.response.status : 'No response');
            console.error('Response data:', error.response ? error.response.data : 'No response data');
        }

        Store.addNotification({
            title: 'Success!',
            message: `Welcome to Books2Borrow ${email}!`,
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            },
            onRemoval: () => navigate("/SimpleUserDashboard")
            });
    };

    return (
        <>
            <Navigation />
            <h1 style={{textAlign: "center"}}>Login</h1>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
                <form onSubmit={handleSubmit}>
                    <div>
                    {error && <p style={{color : "red"}}>{error}</p>}
                        <label>Email:</label><br/>
                        <TextField id="outlined-basic" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label><br/>
                        <TextField id="outlined-basic" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div><br/>
                    <Button type="submit" variant="contained" color="success" > Login </Button>
                </form>
                </Box>
                <br/>
                <div style={{textAlign: "center"}}>
                    <p>Need to register? <a href="/register">Click here!</a></p>
                </div>
        </>
    );
}

export default LoginForm;