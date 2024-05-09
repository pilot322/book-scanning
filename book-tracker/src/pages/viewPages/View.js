import BookTable from "../../components/view/BookTable";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import FilterCheckbox from "../../components/view/FilterCheckbox";
import { v4 as uuidv4 } from 'uuid';

export default function View() {
    const axiosPrivate = useAxiosPrivate();
    const [books, setBooks] = useState(null);
    const [search, setSearch] = useState(null);

    const [dateRange, setDateRange] = useState("");
    const [isReceived, setIsReceived] = useState(true);
    const [isScanning, setIsScanning] = useState(true);
    const [isPaused, setIsPaused] = useState(true);
    const [isFinished, setIsFinished] = useState(true);

    const handleSearch = async () => {
        setSearch('pending');
        try {
            const response = await axiosPrivate.post("/api/books/filter", {
                date: dateRange,
                isReceived,
                isScanning,
                isPaused,
                isFinished
            });
            const noid_books = response.data;
            noid_books.forEach(book => {
                book._id = uuidv4();
            });
            setBooks(noid_books);
            setSearch('done');
        } catch (error) {
            console.error("Failed to fetch books:", error);
            setSearch(null);
        }
    }

    return (
        <div className="flex flex-col w-full">
            <h1 className="mb-4 text-4xl font-bold">Βιβλία</h1>
            <h2 className="mb-10 font-semibold">Πολλαπλή αναζήτηση</h2>

            <div className="card bg-base-200 p-5 w-SEARCHCARD mb-4">
                <select className="select select-bordered w-60 mb-2" value={dateRange} onChange={e => setDateRange(e.target.value)}>
                    <option disabled value="">Επίλεξε χρονικό πλαίσιο...</option>
                    <option value="today">Σήμερα</option>
                    <option value="last_week">Τελευταία βδομάδα</option>
                    <option value="last_2_weeks">Τελευταίες 2 βδομάδες</option>
                    <option value="last_month">Τελευταίο μήνα</option>
                    <option value="all">Όλα</option>
                </select>
                <div className="flex flex-col items-end justify-end w-full">
                    <div className="flex items-center justify-start w-full space-x-10 mb-2">
                        <FilterCheckbox checked={isReceived} color="checkbox-accent" onChange={e => setIsReceived(e.target.checked)} label="Παραλαβές" />
                        <FilterCheckbox checked={isScanning} color="checkbox-primary" onChange={e => setIsScanning(e.target.checked)} label="Σε σάρωση" />
                        <FilterCheckbox checked={isPaused} color="checkbox-warning" onChange={e => setIsPaused(e.target.checked)} label="Σε παύση" />
                        <FilterCheckbox checked={isFinished} color="checkbox-error" onChange={e => setIsFinished(e.target.checked)} label="Σαρωμένα" />
                    </div>
                    <button
                        className="btn btn-circle btn-secondary"
                        onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="secondary-content-fill">
                            <path d="m21.707 20.293-4.539-4.539a8.527 8.527 0 1 0-1.414 1.414l4.539 4.539zM10.5 17a6.5 6.5 0 1 1 6.5-6.5 6.508 6.508 0 0 1-6.5 6.5z" />
                            <path d="M9.845 11.43 7.707 9.293l-1.414 1.414 3.862 3.863 4.677-7.015-1.664-1.11-3.323 4.985z" />
                        </svg>
                    </button>
                </div>
            </div>



            {search === 'pending' && <div className="skeleton w-SEARCHCARD h-60"></div>}
            {search === 'done' && <BookTable books={books}></BookTable>}
        </div >
    );
}
