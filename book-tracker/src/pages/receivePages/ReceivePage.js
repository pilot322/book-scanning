import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ReceiveBatchPage from "./ReceiveBatchPage";
import BookReceiveBatch from "../../components/receive/BookReceiveBatch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


export default function ReceivePage() {
    const [isMakingNew, setMakingNew] = useState(false);
    const [batches, setBatches] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const handleNewBatchClick = () => {
        setMakingNew(true);
    };

    const handleBatchSubmit = (numBooks, startBarcode) => {
        setBatches((prevBatches) => [
            ...prevBatches,
            { id: uuidv4(), numBooks, startBarcode, books: [] },
        ]);
        setMakingNew(false);
    };

    const handleDeleteBatch = (id) => {
        setBatches((prevBatches) => prevBatches.filter((batch) => batch.id !== id));
    };

    const updateBatchBooks = (id, books) => {
        setBatches((prevBatches) =>
            prevBatches.map((batch) =>
                batch.id === id ? { ...batch, books } : batch
            )
        );
    };

    const handleCompleteSubmission = async () => {
        const books = batches.flatMap((batch) =>
            batch.books.map((book) => ({
                barcode: book.barcode,
                title: book.title,
            }))
        );

        console.log(books);

        try {
            const allBooks = [].concat(...batches.map((batch) => batch.books));
            const response = await axiosPrivate.post("/api/books/", { books: allBooks });
            console.log("Submission successful", response);
            setBatches([]);
        } catch (error) {
            console.error("Submission failed", error);
        }
    };

    return (
        <div className="flex flex-col items-start justify-center space-y-4">
            <h1 className="mb-6 text-4xl font-extrabold self-center">Παραλαβή βιβλίων</h1>
            <h2 className="mb-2 text-2xl font-semibold self-center">Αριθμός παραλαβής #XX</h2>

            {batches.map((batch) => (
                <BookReceiveBatch
                    key={batch.id}
                    id={batch.id}
                    numBooks={batch.numBooks}
                    startBarcode={batch.startBarcode}
                    handleDeleteBatch={handleDeleteBatch}
                    updateBatch={updateBatchBooks}
                />
            ))}

            {!isMakingNew && (
                <div className="flex justify-between w-full">
                    <button
                        className="btn btn-square btn-success flex items-center"
                        onClick={handleNewBatchClick}
                    >
                        <p className="text-2xl text-center">+</p>
                    </button>

                    {batches.length > 0 && (
                        <button className="btn btn-warning" onClick={handleCompleteSubmission}>
                            Ολοκλήρωση παραλαβής
                        </button>
                    )}
                </div>
            )}

            {isMakingNew && (
                <ReceiveBatchPage
                    setMakingNew={setMakingNew}
                    handleBatchSubmit={handleBatchSubmit}
                />
            )}
        </div>
    );
}
