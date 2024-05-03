import React from 'react';

function Login() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">Login</h1>
            <form>
                <label className="block">
                    <span className="text-gray-700">Username</span>
                    <input type="text" className="mt-1 block w-full input input-bordered" placeholder="john.doe" />
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Password</span>
                    <input type="password" className="mt-1 block w-full input input-bordered" placeholder="********" />
                </label>
                <button type="submit" className="btn btn-primary mt-4">Login</button>
            </form>
        </div>
    );
}

export default Login;
