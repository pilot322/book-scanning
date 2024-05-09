import React, { useState } from "react";

function BookReceiveBatch({ id, numBooks, startBarcode, handleDeleteBatch, updateBatch }) {
    const prefix = startBarcode.slice(0, -5);
    const suffix = parseInt(startBarcode.slice(-5), 10);

    const [bookDetails, setBookDetails] = useState(
        Array.from({ length: numBooks }, (_, i) => ({
            barcode: `${prefix}${(suffix + i).toString().padStart(5, "0")}`,
            title: "",
        }))
    );

    const handleTitleChange = (index, newTitle) => {
        const newBookDetails = [...bookDetails];
        newBookDetails[index].title = newTitle;
        setBookDetails(newBookDetails);
        updateBatch(id, newBookDetails);
    };

    return (
        <div className="flex items-center justify-start space-x-5 mb-10">
            <table className="table bg-base-200">
                <thead>
                    <tr>
                        <th className="text-primary">Barcode</th>
                        <th className="text-primary">Τίτλος</th>
                    </tr>
                </thead>
                <tbody>
                    {bookDetails.map((book, index) => (
                        <tr key={index} className={index % 2 === 0 ? '' : ''}>
                            <td className="font-semibold">{book.barcode}</td>
                            <td>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={book.title}
                                    onChange={(e) =>
                                        handleTitleChange(index, e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="btn btn-circle btn-error mb-2"
                onClick={() => handleDeleteBatch(id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m432 144l-28.67 275.74A32 32 0 0 1 371.55 448H140.46a32 32 0 0 1-31.78-28.26L80 144" /><rect width="448" height="80" x="32" y="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="16" ry="16" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M312 240L200 352m112 0L200 240" /></svg>
            </button>
        </div>
    );
}

export default BookReceiveBatch;
