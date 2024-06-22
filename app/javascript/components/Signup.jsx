// app/javascript/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/users', { user: { email, password, password_confirmation: passwordConfirmation } })
            .then(response => {
                setSuccess('Signup successful!');
                setError('');
            })
            .catch(error => {
                setError('Signup failed. Please check your inputs and try again.');
                setSuccess('');
            });
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Sign Up
                </Button>
            </form>
        </Container>
    );
};

export default Signup;
