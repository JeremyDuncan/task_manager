// app/javascript/components/Root.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskList from './TaskList';
import Login from './Login';
import Signup from './Signup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

const theme = createTheme();

const Root = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/login">Sign In</Button>
                    <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                    <Button color="inherit" component={Link} to="/tasks">Task List</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/" element={<Login />} /> {/* Default route */}
                </Routes>
            </Container>
        </Router>
    </ThemeProvider>
);

export default Root;
