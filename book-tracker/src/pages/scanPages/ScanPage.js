import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useScan from '../../hooks/useScan';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function ScanPage() {
    const { auth } = useAuth();
    const { setIsScanning } = useScan();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const barcodeRef = useRef();
    const errRef = useRef();

    const [barcode, setBarcode] = useState('');
    const [scanner, setScanner] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post("http://localhost:4000/api/sessions/start", {
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
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-6 text-4xl font-extrabold">Σάρωση βιβλίου</h1>
            <p ref={errRef} className={errMsg ? "errmsg text-error" : "offscreen"}>{errMsg}</p>

            <form onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700">Barcode</span>
                    <input
                        type="text"
                        className="mt-1 block w-full input input-bordered"
                        placeholder="XXX-XXX-XXX"
                        ref={barcodeRef}
                        onChange={(e) => setBarcode(e.target.value)}
                        value={barcode}
                        required
                    />
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Scanner</span>
                    <input
                        type="text"
                        className="mt-1 block w-full input input-bordered"
                        placeholder="XX"
                        onChange={(e) => setScanner(e.target.value)}
                        value={scanner}
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary mt-4">Συνέχεια</button>
            </form>
        </div>
    );
}
