// app/javascript/components/Login.jsx
import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear existing errors

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        try {
            const response = await fetch('/users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: password,
                    }
                })
            });

            if (response.ok) {
                login(); // Call login function from context
                navigate('/tasks'); // Redirect to /tasks upon successful login
            } else {
                const data = await response.json();
                setError(data.error || 'Invalid email or password');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign In
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Sign In
                </Button>
            </form>
        </Container>
    );
};

export default Login;
