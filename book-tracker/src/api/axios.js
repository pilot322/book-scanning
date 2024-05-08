import axios from 'axios';
const BASE_URL = 'https://68f2fcb3-d5f9-42a1-bfcf-ebcafe366e6d-00-1ji9fwriai6lm.kirk.replit.dev/';


export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})