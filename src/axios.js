import axios from 'axios';

//Axios instance
export const makeRequest = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // Add any additional configuration can be written down here
});