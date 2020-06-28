import axios from 'axios';

const api = axios.create({baseURL: 'http://10.0.1.56:3333/',timeout: 1000})

export default api