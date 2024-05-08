import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ViewBook() {
    const location = useLocation();
    const bookdata = location.state.bookdata;
    const { barcode, title, receiver, receivedDate, status, sessionData } = bookdata;
    const navigate = useNavigate();

    console.log(sessionData);



    <table className="table">
        <thead>
            <tr>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>

        </tbody >
    </table >



    return (
        <div className='flex flex-col justify-center items-center text-2xl space-y-8'>

            <h1 className="mb-6 text-4xl font-semibold">Πληροφορίες βιβλίου</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Barcode</th>
                        <th>{barcode}</th>

                    </tr>

                    <tr>
                        <th>Τίτλος</th>
                        <th>{title}</th>
                    </tr>

                    <tr>
                        <th>Παραλήπτης</th>
                        <th>{receiver}</th>
                    </tr>

                    <tr>
                        <th>Ημερομηνία παραλαβής</th>
                        <th>{receivedDate}</th>
                    </tr>

                    <tr>
                        <th>Κατάσταση</th>
                        <th>{status}</th>
                    </tr>
                </tbody >
            </table>
            {status !== 'received' && <p className='text-semibold'>Σέσιον:</p>}
            <div className='flex flex-wrap justify-around items-center'>
                {sessionData.map((session, index) => (
                    <div key={index} className='bg-amber-100 min-w-80 rounded-2xl border'>
                        <p>Χρήστης: {session.username}</p>
                        <p>Τύπος: {session.sessionType}</p>
                        <p>Ώρα εκκίνησης: {session.startTime}</p>
                        <p>Ώρα σταματημού: {session.endTime}</p>
                        <p>Κατάσταση: {session.status}</p>
                        <p>Αρχικό frame: {session.startPage}</p>
                        <p>Τελικό frame: {session.stopPage}</p>
                        <p>Scanner id: {session.scannerId}</p>
                    </div>
                ))}
            </div>

        </div >
    );
}

export default ViewBook;