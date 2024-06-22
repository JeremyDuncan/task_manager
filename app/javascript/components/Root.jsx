import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskList from './TaskList';
import Login from './Login';
import Signup from './Signup';
import TaskForm from './TaskForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { AuthProvider, AuthContext } from '../context/AuthContext';

const theme = createTheme();

const Root = ({ initialTasks = [], initialCategories = [], initialTags = [] }) => {
    const [tasks, setTasks] = useState(initialTasks);
    const [categories, setCategories] = useState(initialCategories);
    const [tags, setTags] = useState(initialTags);

    useEffect(() => {
        fetchCategories();
        fetchTags();
    }, []);

    const fetchCategories = () => {
        fetch('/categories.json')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    };

    const fetchTags = () => {
        fetch('/tags.json')
            .then(response => response.json())
            .then(data => setTags(data))
            .catch(error => console.error('Error fetching tags:', error));
    };

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <AuthContext.Consumer>
                                {({ isAuthenticated, logout }) => (
                                    <>
                                        {!isAuthenticated && <Button color="inherit" component={Link} to="/login">Sign In</Button>}
                                        {!isAuthenticated && <Button color="inherit" component={Link} to="/signup">Sign Up</Button>}
                                        {isAuthenticated && (
                                            <>
                                                <Button color="inherit" onClick={logout}>Log Out</Button>
                                                <Button color="inherit" component={Link} to="/tasks">Task List</Button>
                                                <Button color="inherit" component={Link} to="/tasks/new">New Task</Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </AuthContext.Consumer>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/tasks" element={<TaskList tasks={tasks} />} />
                            <Route path="/tasks/new" element={<TaskForm categories={categories} tags={tags} />} />
                            <Route path="/tasks/:id/edit" element={<TaskForm categories={categories} tags={tags} />} />
                            <Route path="/" element={<Login />} /> {/* Default route */}
                        </Routes>
                    </Container>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default Root;
