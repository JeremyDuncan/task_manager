import axios from 'axios';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

axios.defaults.headers.common['X-CSRF-Token'] = token;

export default axios;
