// app/javascript/packs/application.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from '../components/Root';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  const tasks = JSON.parse(rootElement.getAttribute('data-tasks') || '[]');
  const task = JSON.parse(rootElement.getAttribute('data-task') || '{}');
  const categories = JSON.parse(rootElement.getAttribute('data-categories') || '[]');
  const tags = JSON.parse(rootElement.getAttribute('data-tags') || '[]');

  const root = createRoot(rootElement);
  root.render(<Root tasks={tasks} task={task} categories={categories} tags={tags} />);
});
