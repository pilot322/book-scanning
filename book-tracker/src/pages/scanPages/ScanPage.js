import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function ScanPage() {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();


    const barcodeRef = useRef();
    const errRef = useRef();

    const [barcode, setBarcode] = useState('');
    const [scanner, setScanner] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post("/api/sessions/start", {
                barcode: barcode,
                startPage: 1, // Example value, adjust as needed
                sessionType: 'scanning',
                scannerId: scanner
            });

            if (response.status === 201) {
                navigate('/scan/session', {
                    state: { barcode, scanner },
                    replace: true
                });
            } else {
                setErrMsg("Failed to start scanning session.");
            }
        } catch (error) {
            console.error("Failed to start scanning session:", error);
            setErrMsg("Failed to start scanning session.");
        }
    };

    return (
        <div className="flex flex-col items-start justify-start">
            <h1 className="mb-10 text-4xl font-bold">Σάρωση βιβλίου</h1>
            <p ref={errRef} className={errMsg ? "errmsg text-error" : "offscreen"}>{errMsg}</p>

            <form onSubmit={handleSubmit}>
                <label className="block">
                    <span>Barcode</span>
                    <input
                        type="text"
                        className="mt-1 block w-full input input-bordered"
                        ref={barcodeRef}
                        onChange={(e) => setBarcode(e.target.value)}
                        value={barcode}
                        required
                    />
                </label>

                <label className="block mt-4">
                    <span>Scanner</span>
                    <input
                        type="text"
                        className="mt-1 block w-full input input-bordered"
                        onChange={(e) => setScanner(e.target.value)}
                        value={scanner}
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary mt-10">Συνέχεια</button>
            </form>
        </div>
    );
}
