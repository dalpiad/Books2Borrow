import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authToken = btoa(`${email}:${password}`); // Base64 encode email and password
        try {
            const response = await axios.get('http://localhost:8080/user', {
                headers: {
                    'Authorization': `Basic ${authToken}`
                }
            });
            console.log('Response:', response.data);

            // Save Authorization header to local storage if present
            const authHeader = response.headers['authorization'];
            if (authHeader) {
                localStorage.setItem('Authorization', authHeader);
                console.log('Authorization header saved to local storage.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;