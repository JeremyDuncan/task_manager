// app/javascript/components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Task List
            </Typography>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.id}>
                        <ListItemText primary={task.title} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TaskList;
