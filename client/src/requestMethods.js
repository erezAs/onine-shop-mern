import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWE0OTk1MDdiZGZhYWI2YTM3NmMwMzYiLCJpYXQiOjE2MzgxNzcxMDgsImV4cCI6MTYzODQzNjMwOH0.1sgkZT7aQ8Gzm319xZnIKraPpN2eqjv6-f1wmculC9Y";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})


export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers : {token:`Bearer ${TOKEN}`}
})