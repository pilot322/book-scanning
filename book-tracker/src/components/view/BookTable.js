import React from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
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
        <div className='border rounded-2xl w-1/2 m-5'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Barcode</th>
                        <th>Τίτλος</th>
                        <th>Κατάσταση</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr className='cursor-pointer hover:bg-amber-200' key={book._id} onClick={() => handleClick(book.barcode)}>
                            <td>{book.barcode}</td>
                            <td>{book.title}</td>
                            <td>{book.status}</td>
                            {
                                /*
                            <td className="border px-4 py-2">
                                <button className="btn btn-warning">Επεξεργασία</button>
                                <button className="btn btn-error ml-4">Διαγραφή</button>
                            </td>
                            */
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookTable;