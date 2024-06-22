import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const CategoryForm = ({ onClose, onCategoryCreated, onCategoryError }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('[name=csrf-token]').content;

        fetch('/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ category: { name } })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data });
                }
                return response.json();
            })
            .then(data => {
                onCategoryCreated(data);
                onClose();
            })
            .catch(data => {
                const errorMessage = data.name ? data.name[0] : 'Failed to create category.';
                setError(errorMessage);
                onCategoryError(errorMessage);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Category Name"
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

export default CategoryForm;
