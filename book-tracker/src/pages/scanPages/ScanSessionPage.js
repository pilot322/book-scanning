import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScan from '../../hooks/useScan';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function ScanSessionPage() {
    const [barcode, setBarcode] = useState(null);
    const [scanner, setScanner] = useState(null);
    const [title, setTitle] = useState(null);
    const [startingFrame, setStartingFrame] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { setIsScanning } = useScan();

    const [isAutoFramesChecked, setAutoFramesChecked] = useState(true);
    const startingFrameRef = useRef();
    const endingFrameRef = useRef();

    useEffect(() => {
        axiosPrivate.get("/api/sessions/user").then(response => {
            if (response.status === 200) {
                console.log(response.data)
                setBarcode(response.data.barcode);
                setScanner(response.data.scanner);
                setTitle(response.data.title);

                if (response.data.startingPage) {
                    setStartingFrame(response.data.startingPage);
                }
                setIsScanning(true);
            } else {
                console.log("Failed to get user session:", response.data);
            }
        }
        );


        startingFrameRef.current.disabled = true;
        endingFrameRef.current.disabled = isAutoFramesChecked;

    }, [axiosPrivate, setIsScanning, setBarcode, setScanner, isAutoFramesChecked]);

    const handleAutoFramesToggle = () => {
        setAutoFramesChecked(!isAutoFramesChecked);
        endingFrameRef.current.disabled = !isAutoFramesChecked;
    };

    const handlePauseClick = () => {
        document.getElementById('pause_modal').showModal();
    };

    const handleStopClick = () => {
        document.getElementById('stop_modal').showModal();
    };

    const handlePause = async () => {
        const response = await axiosPrivate.post("/api/sessions/pause", {
            startingFrame: startingFrameRef.current.value,
            endingFrame: endingFrameRef.current.value
        });

        console.log('ok' + response)

        if (response.status === 200) {
            setIsScanning(false);
            navigate('/', { replace: true });
        } else {
            console.log("Failed to pause scanning session:", response.data)
        }
    };

    const handleStop = async () => {
        const response = await axiosPrivate.post("/api/sessions/stop", {
            startingFrame: startingFrameRef.current.value,
            endingFrame: endingFrameRef.current.value
        });

        console.log('ok' + response)

        if (response.status === 200) {
            setIsScanning(false);
            navigate('/', { replace: true });
        } else {
            console.log("Failed to pause scanning session:", response.data)
        }
    };

    return (
        <div className="flex flex-col items-start justify-start">
            <h1 className="mb-2 text-4xl font-extrabold">{barcode}</h1>
            <h2 className="mb-10 text-2xl font-semibold">{title}</h2>
            <span className='mb-10 text-xs font-medium'>Scanner: {scanner}</span>

            <label className="label cursor-pointer space-x-5 mb-2">
                <span className="label-text">Auto frames</span>
                <input
                    type="checkbox"
                    className={"toggle toggle-success ".concat(isAutoFramesChecked ? "[--tglbg:white]" : "")}
                    checked={isAutoFramesChecked}
                    onChange={handleAutoFramesToggle}
                />
            </label>

            <div className='flex items-center w-30 mb-2'>
                <span className='w-40'>Αρχικό frame</span>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-16 size-8"
                    ref={startingFrameRef}
                    onChange={(e) => setStartingFrame(e.target.value)}
                    value={startingFrame}
                />
            </div>

            <div className='flex items-center w-30 mb-20'>
                <span className='w-40'>Τελικό frame</span>
                <input
                    type="text"
                    placeholder="-"
                    className="input input-bordered w-16 size-8"
                    ref={endingFrameRef}
                />
            </div>


            <button className='btn btn-warning w-20 mb-5' onClick={handlePauseClick}>Διακοπή</button>
            <button className='btn btn-error w-20' onClick={handleStopClick}>Λήξη</button>


            <dialog id="pause_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Επιβεβαίωση λήξης</h3>
                    <p className="py-4">Εισαι σίγουρος ότι θες να κάνεις <span className='text-warning font-semibold'>ΔΙΑΚΟΠΗ</span>;</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn mr-10" onClick={handlePause}>Ναι</button>
                            <button className="btn">Άκυρο</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="stop_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Επιβεβαίωση λήξης</h3>
                    <p className="py-4">Είσαι σίγουρος ότι θες να κάνεις <span className='text-error font-bold'>ΛΗΞΗ</span>;</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn mr-10" onClick={handleStop}>Ναι</button>
                            <button className="btn">Ακυρο</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ScanSessionPage;
