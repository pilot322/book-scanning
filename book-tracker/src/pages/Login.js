import React, { useRef, useState, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import axios from '../api/axios'

const LOGIN_URL = '/auth/login';

export default function Login() {
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (auth?.roles) navigate('/');

        else
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
                { username: user, password },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

            );
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth({ user, password, roles, accessToken })

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
        auth?.roles ? <div></div> :
            <section className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-2">Login</h1>
                <p ref={errRef} className={errMsg ? "errmsg text-error" : "offscreen"}>{errMsg}</p>
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

