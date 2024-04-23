import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:4000/api/test')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(err => console.error("Error fetching data: ", err));
    }, []);

    return (
        <div>
            <h1>Response from Backend:</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
