import axios from 'axios';

// const url = process.env.NODE_ENV = 'development'
//     ?"http://localhost:3333"
//     :"http://10.0.1.56:3333/";

const api = axios.create({ baseURL:'http://localhost:3333/', timeout: 5000 })

export default api