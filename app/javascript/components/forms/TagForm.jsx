import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const TagForm = ({ onClose, onTagCreated, onTagError }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('[name=csrf-token]').content;

        fetch('/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ tag: { name } })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    setError('You already have a tag with this name');
                    onTagError('You already have a tag with this name');
                } else {
                    onTagCreated(data);
                    onClose();
                }
            })
            .catch(error => {
                console.error('Error creating tag:', error);
                setError('Failed to create tag.');
                onTagError('Failed to create tag.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Tag Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
                Create
            </Button>
        </form>
    );
};

export default TagForm;
