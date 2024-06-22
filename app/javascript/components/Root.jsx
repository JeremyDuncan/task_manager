import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TaskForm from './forms/TaskForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Container, CircularProgress, Box } from '@mui/material';
import { AuthProvider, AuthContext } from '../context/AuthContext';

const theme = createTheme();

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <Box display="flex" justifyContent="center" mt={2}><CircularProgress /></Box>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

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

    const AuthWithNavigate = () => {
        const navigate = useNavigate();
        const { isAuthenticated, logout } = useContext(AuthContext);

        const handleLogout = () => {
            logout();
            navigate('/');
        };

        return (
            <>
                {!isAuthenticated && <Button color="inherit" component={Link} to="/login">Sign In</Button>}
                {!isAuthenticated && <Button color="inherit" component={Link} to="/signup">Sign Up</Button>}
                {isAuthenticated && (
                    <>
                        <Button color="inherit" onClick={handleLogout}>Log Out</Button>
                        <Button color="inherit" component={Link} to="/tasks">Task List</Button>
                        <Button color="inherit" component={Link} to="/tasks/new">New Task</Button>
                    </>
                )}
            </>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <AuthWithNavigate />
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/tasks" element={<PrivateRoute><TaskList tasks={tasks} /></PrivateRoute>} />
                            <Route path="/tasks/new" element={<PrivateRoute><TaskForm categories={categories} tags={tags} /></PrivateRoute>} />
                            <Route path="/tasks/:id/edit" element={<PrivateRoute><TaskForm categories={categories} tags={tags} /></PrivateRoute>} />
                            <Route path="/" element={<Navigate to="/tasks" />} /> {/* Default route */}
                        </Routes>
                    </Container>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default Root;
