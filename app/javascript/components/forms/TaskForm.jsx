import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import CategoryForm from './CategoryForm';

const TaskForm = ({ task, categories, tags }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [tagIds, setTagIds] = useState([]);
    const [error, setError] = useState('');
    const [categoryList, setCategoryList] = useState(categories);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categoryError, setCategoryError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setDueDate(task.due_date ? task.due_date.split('T')[0] : '');
            setCategoryId(task.category_id || '');
            setTagIds(task.tags ? task.tags.map(tag => tag.id) : []);
        } else if (id) {
            fetch(`/tasks/${id}.json`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title || '');
                    setDescription(data.description || '');
                    setDueDate(data.due_date ? data.due_date.split('T')[0] : '');
                    setCategoryId(data.category_id || '');
                    setTagIds(data.tags ? data.tags.map(tag => tag.id) : []);
                })
                .catch(error => {
                    console.error('Error fetching task:', error);
                    setError('Failed to load task.');
                });
        }
    }, [id, task]);

    useEffect(() => {
        setCategoryList(categories);
    }, [categories]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskData = {
            task: {
                title,
                description,
                due_date: dueDate,
                category_id: categoryId,
                tag_ids: tagIds
            }
        };

        const csrfToken = document.querySelector('[name=csrf-token]').content;

        if (id) {
            fetch(`/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify(taskData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.errors) {
                        setError('Failed to update task.');
                    } else {
                        navigate('/tasks');
                    }
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                    setError('Failed to update task.');
                });
        } else {
            fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify(taskData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.errors) {
                        setError('Failed to create task.');
                    } else {
                        navigate('/tasks');
                    }
                })
                .catch(error => {
                    console.error('Error creating task:', error);
                    setError('Failed to create task.');
                });
        }
    };

    const handleOpenCategoryModal = () => {
        setIsCategoryModalOpen(true);
    };

    const handleCloseCategoryModal = () => {
        setIsCategoryModalOpen(false);
        setCategoryError(''); // Clear category error when closing modal
    };

    const handleCategoryCreated = (newCategory) => {
        setCategoryList([...categoryList, newCategory]);
        setCategoryId(newCategory.id);
        setCategoryError('');
    };

    const handleCategoryError = (errorMessage) => {
        setCategoryError(errorMessage);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {id ? 'Edit Task' : 'New Task'}
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Due Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Category"
                    fullWidth
                    margin="normal"
                    select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value="" />
                    {categoryList.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </TextField>
                {categoryError && <Alert severity="error">{categoryError}</Alert>}
                <Button variant="contained" color="primary" onClick={handleOpenCategoryModal}>
                    Add New Category
                </Button>
                <TextField
                    label="Tags"
                    fullWidth
                    margin="normal"
                    select
                    value={tagIds}
                    onChange={(e) => setTagIds(Array.from(e.target.selectedOptions, option => option.value))}
                    SelectProps={{
                        multiple: true,
                        native: true,
                    }}
                >
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                            {tag.name}
                        </option>
                    ))}
                </TextField>
                <Button variant="contained" color="primary" type="submit">
                    {id ? 'Update Task' : 'Create Task'}
                </Button>
            </form>

            <Dialog open={isCategoryModalOpen} onClose={handleCloseCategoryModal}>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogContent>
                    <CategoryForm onClose={handleCloseCategoryModal} onCategoryCreated={handleCategoryCreated} onCategoryError={handleCategoryError} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCategoryModal} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TaskForm;
