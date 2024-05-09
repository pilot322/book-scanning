import React from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import getColorFromStatus from '../../utility/getColorFromStatus';

import {
    useNavigate

} from 'react-router-dom';
function BookTable({ books }) {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const handleClick = async (id) => {
        console.log('clicked', id);
        const response = await axiosPrivate.get(`/api/books/${id}`);
        console.log(response.data);

        navigate('/view/book', { state: { bookdata: response.data } });
    }

    return (
        <div className='flex flex-col'>
            <span className='mb-2'>Αποτελέσματα αναζήτησης</span>
            <div className='border border-base-300 rounded-2xl w-SEARCHCARD'>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='font-bold text-primary'>Barcode</th>
                            <th className='font-bold text-primary'>Τίτλος</th>
                            <th className='font-bold text-primary'>Κατάσταση</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr className='cursor-pointer hover:bg-secondary' key={book._id} onClick={() => handleClick(book.barcode)}>
                                <td className='font-bold'>{book.barcode}</td>
                                <td>{book.title}</td>
                                <td className={getColorFromStatus(book.status)}>{book.status}</td>
                            </tr>
                        ))}
                        <tr>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookTable;