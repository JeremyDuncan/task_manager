// app/javascript/components/Signup.jsx
import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.createElement('form');
        form.action = '/users';
        form.method = 'post';
        form.style.display = 'none';

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const authenticityToken = document.createElement('input');
        authenticityToken.name = 'authenticity_token';
        authenticityToken.value = csrfToken;
        form.appendChild(authenticityToken);

        const emailInput = document.createElement('input');
        emailInput.name = 'user[email]';
        emailInput.value = email;
        form.appendChild(emailInput);

        const passwordInput = document.createElement('input');
        passwordInput.name = 'user[password]';
        passwordInput.value = password;
        form.appendChild(passwordInput);

        const passwordConfirmationInput = document.createElement('input');
        passwordConfirmationInput.name = 'user[password_confirmation]';
        passwordConfirmationInput.value = passwordConfirmation;
        form.appendChild(passwordConfirmationInput);

        document.body.appendChild(form);
        form.submit();
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
