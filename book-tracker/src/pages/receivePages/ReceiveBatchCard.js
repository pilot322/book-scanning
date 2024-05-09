import { useState } from "react";

function ReceiveBatchCard({ setMakingNew, handleBatchSubmit }) {
    const [numBooks, setNumBooks] = useState("");
    const [startBarcode, setStartBarcode] = useState("");
    const [bookType, setBookType] = useState("");
    const [ypothikofylakeioId, setYpothikofylakeioId] = useState("");

    const handleOkClick = () => {
        handleBatchSubmit(Number(numBooks), startBarcode);
    };

    const bookTypeOptions = [
        { value: "01", label: "Τύπος βιβλίου 1" },
        { value: "02", label: "Τύπος βιβλίου 2" },
        { value: "03", label: "Τύπος βιβλίου 3" },
        { value: "04", label: "Τύπος βιβλίου 4" },
        { value: "05", label: "Τύπος βιβλίου 5" }
    ]

    const ypothikofylakeioOptions = [
        { value: "01", label: "Υποθηκοφυλάκειο 1" },
        { value: "02", label: "Υποθηκοφυλάκειο 2" },
        { value: "03", label: "Υποθηκοφυλάκειο 3" },
        { value: "04", label: "Υποθηκοφυλάκειο 4" },
        { value: "05", label: "Υποθηκοφυλάκειο 5" }
    ]


    return (
        <div className='card w-96 bg-base-200'>
            <div className="card-body">
                <h2 className="card-title mb-4">Στοιχεία βιβλίων</h2>

                <select className="select w-full " value={bookType} onChange={e => setBookType(e.target.value)}>
                    <option disabled value="">Επίλεξε τύπο βιβλίου...</option>
                    {
                        bookTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>

                <select className="select w-full" value={ypothikofylakeioId} onChange={e => setYpothikofylakeioId(e.target.value)}>
                    <option disabled value="">Επίλεξε τύπο βιβλίου...</option>
                    {
                        ypothikofylakeioOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>

                <label className="flex items-center">
                    <span className="pl-2 w-40">Πλήθος βιβλίων</span>
                    <input
                        type="text"
                        className="bg-base-200 hover:bg-base-100 border border-base-content rounded-full w-12 size-10 text-center"
                        value={numBooks}
                        onChange={(event) => setNumBooks(event.target.value)}
                    />
                </label>

                <label className="flex items-center">
                    <span className="pl-2 w-40">Αρχικό barcode</span>
                    <input
                        type="text"
                        className="bg-base-200 hover:bg-base-100 border border-base-content rounded-full w-36 size-10 text-center"
                        value={startBarcode}
                        onChange={(e) => setStartBarcode(e.target.value)}
                    />
                </label>

                <div className="flex space-x-4 mt-4">
                    <button
                        className="btn btn-circle btn-secondary"
                        onClick={handleOkClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30" className="secondary-content-fill">
                            <g>
                                <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
                            </g>
                        </svg>
                    </button>

                    <button
                        className="btn btn-circle btn-error"
                        onClick={() => setMakingNew(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="secondary-content-fill" viewBox="0 0 24 24" >
                            <path strokeWidth="" d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReceiveBatchCard;
