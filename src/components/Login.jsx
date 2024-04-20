import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authToken = btoa(`${email}:${password}`);
        try {
            const response = await axios.get('http://localhost:8080/user', {
                headers: {
                    'Authorization': `Basic ${authToken}`
                }
            });
            console.log('Response:', response.data);
            console.log('All Headers:', response.headers);

            const authHeader = response.headers['authorization'];
            console.log('Authorization Header:', authHeader);

            if (authHeader) {
                localStorage.setItem('jwt', authHeader);
                console.log('JWT saved to local storage:', authHeader);
            } else {
                console.error('Authorization header is missing or improperly formatted.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('Response status:', error.response ? error.response.status : 'No response');
            console.error('Response data:', error.response ? error.response.data : 'No response data');
        }
        navigate("/")
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;