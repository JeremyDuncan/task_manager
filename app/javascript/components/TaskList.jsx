import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        fetch('/tasks.json')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => {
                console.error('Error fetching tasks:', error);
                setError('Failed to load tasks.');
            });
    };

    const handleDelete = (taskId) => {
        fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('[name=csrf-token]').content
            },
        })
            .then(response => {
                if (response.ok) {
                    setTasks(tasks.filter(task => task.id !== taskId));
                } else {
                    console.error('Failed to delete task');
                    setError('Failed to delete task.');
                }
            })
            .catch(error => {
                console.error('Error deleting task:', error);
                setError('Failed to delete task.');
            });
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Task List
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/tasks/new">
                New Task
            </Button>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {tasks.length === 0 ? (
                <Typography variant="body1">No tasks available.</Typography>
            ) : (
                <List>
                    {tasks.map(task => (
                        <ListItem key={task.id}>
                            <ListItemText primary={task.title} />
                            <Button variant="contained" color="secondary" component={Link} to={`/tasks/${task.id}/edit`}>
                                Edit
                            </Button>
                            <Button variant="contained" color="error" onClick={() => handleDelete(task.id)}>
                                Delete
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default TaskList;
