// app/javascript/components/Root.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './TaskList';
import Login from './Login';
import Signup from './Signup';

const Root = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<TaskList />} />
        </Routes>
    </Router>
);

export default Root;
