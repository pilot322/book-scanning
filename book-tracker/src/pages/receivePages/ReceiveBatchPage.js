import { useState } from "react";

function ReceiveBatchPage({ setMakingNew, handleBatchSubmit }) {
    const [numBooks, setNumBooks] = useState("");
    const [startBarcode, setStartBarcode] = useState("");

    const handleOkClick = () => {
        handleBatchSubmit(Number(numBooks), startBarcode);
    };

    return (
        <div className='bg-base-200 rounded-2xl p-5 min-w-80 max-w-1/4 flex flex-col self-start justify-start w-1/2 space-y-2'>
            <select className="select select-bordered w-full ">
                <option disabled value>Επέλεξε τύπο βιβλίου...</option>
                <option>Τύπος βιβλίου 1 - 01</option>
                <option>Τύπος βιβλίου 2 - 02</option>
                <option>Τύπος βιβλίου 3 - 03</option>
                <option>Τύπος βιβλίου 4 - 04</option>
                <option>Τύπος βιβλίου 5 - 05</option>
            </select>

            <select className="select select-bordered w-full">
                <option disabled value>Επέλεξε υποθηκοφυλάκειο...</option>
                <option>Υποθηκοφυλάκειο 1 - 01</option>
                <option>Υποθηκοφυλάκειο 2 - 02</option>
                <option>Υποθηκοφυλάκειο 3 - 03</option>
                <option>Υποθηκοφυλάκειο 4 - 04</option>
            </select>

            <label className="input input-bordered flex items-center gap-2">
                Πλήθος βιβλίων
                <input
                    type="text"
                    className="grow"
                    value={numBooks}
                    onChange={(e) => setNumBooks(e.target.value)}
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                Αρχικό barcode
                <input
                    type="text"
                    className="grow"
                    value={startBarcode}
                    onChange={(e) =>
                        setStartBarcode(e.target.value)
                    }
                />
            </label>

            <div className="flex space-x-4 mt-4">
                <button className="btn btn-success" onClick={handleOkClick}>
                    OK
                </button>
                <button
                    className="btn btn-error"
                    onClick={() => setMakingNew(false)}
                >
                    Άκυρο
                </button>
            </div>
        </div>
    );
}

export default ReceiveBatchPage;
