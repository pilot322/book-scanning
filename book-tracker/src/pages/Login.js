import React, { useRef, useState, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import axios from '../api/axios'

const LOGIN_URL = '/auth/login';

export default function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username: user, password }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
                }

            );
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            const role = response?.data?.role;

            setAuth({ user, password, role, accessToken })

            setUser('');
            setPassword('');
            // setSuccess(true)
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Server error. Please try again later');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password');
            } else if (err.response?.status === 401) {
                setErrMsg('Invalid username or password');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current.focus();
        }



    }

    return (
        <section className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">Login</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700">Username</span>
                    <input
                        type="text"
                        className="mt-1 block w-full input input-bordered"
                        placeholder="john.doe"
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        className="mt-1 block w-full input input-bordered"
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary mt-4">Login</button>
            </form>
        </section>
    );
}

