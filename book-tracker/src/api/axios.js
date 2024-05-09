import axios from 'axios';
const BASE_URL = 'https://68f2fcb3-d5f9-42a1-bfcf-ebcafe366e6d-00-1ji9fwriai6lm.kirk.replit.dev/';
const TEST_URL = 'http://localhost:4000/';

const TESTING_ENVIRONMENT = true;

export default axios.create({
    baseURL: TESTING_ENVIRONMENT ? TEST_URL : BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: TESTING_ENVIRONMENT ? TEST_URL : BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})