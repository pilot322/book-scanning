import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import ReceiveBatchPage from "./ReceiveBatchCard";
import BookReceiveBatch from "../../components/receive/BookReceiveBatch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../assets/styles.css";


export default function ReceivePage() {
    const [isMakingNew, setMakingNew] = useState(false);
    const [batches, setBatches] = useState([]);
    const [fillColor, setFillColor] = useState('');
    const axiosPrivate = useAxiosPrivate();

    const handleNewBatchClick = () => {
        setMakingNew(true);
    };

    const handleBatchSubmit = (numBooks, startBarcode, bookType, ypothikofylakeioId) => {
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
        <div className="flex flex-col items-start justify-start">
            <h1 className="mb-2 text-4xl font-bold">Παραλαβή βιβλίων</h1>
            <h2 className="mb-10 text-sm font-semibold">Πρωτόκολλο παραλαβής #XX</h2>

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
                <div className={`flex justify-between mt-${batches.length > 0 ? '10' : '5'}`}>
                    <button
                        className="btn btn-circle btn-secondary flex items-center"
                        onClick={handleNewBatchClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 45.402 45.402" className="secondary-content-fill">
                            <g>
                                <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                            </g>
                        </svg>
                    </button>

                    {batches.length > 0 && (
                        <button className="ml-96 btn btn-circle btn-warning" onClick={handleCompleteSubmission}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30">
                                <g>
                                    <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
                                </g>
                            </svg>
                        </button>
                    )}
                </div>
            )
            }

            {
                isMakingNew && (
                    <ReceiveBatchPage
                        setMakingNew={setMakingNew}
                        handleBatchSubmit={handleBatchSubmit}
                    />
                )
            }
        </div >
    );
}
