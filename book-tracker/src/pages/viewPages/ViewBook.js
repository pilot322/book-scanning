import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import getColorFromStatus from '../../utility/getColorFromStatus';

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
        <div className='flex flex-col text-2xl space-y-8'>

            <div className='flex'>
                <h1 className="mb-6 text-4xl font-semibold mr-8">Πληροφορίες βιβλίου</h1>

                <div className='dropdown dropdown-hover'>
                    <div tabIndex={0} role="button" className='btn btn-secondary btn-outline btn-circle'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className='w-6 h-6'
                            viewBox="0 0 32.055 32.055">
                            <g>
                                <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
		C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
		s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
		c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
                            </g>
                        </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Επεξεργασία</a></li>
                        <li><a>Flag</a></li>
                    </ul>
                </div>
            </div>
            <table className="table w-1/2">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className='bold text-primary'>Barcode</th>
                        <th>{barcode}</th>
                    </tr>

                    <tr>
                        <th className='bold text-primary'>Τίτλος</th>
                        <th>{title}</th>
                    </tr>

                    <tr>
                        <th className='bold text-primary'>Παραλήπτης</th>
                        <th>{receiver}</th>
                    </tr>

                    <tr>
                        <th className='bold text-primary'>Ημερομηνία παραλαβής</th>
                        <th>{receivedDate}</th>
                    </tr>

                    <tr>
                        <th className='bold text-primary'>Κατάσταση</th>
                        <th className={getColorFromStatus(status)}>{status}</th>
                    </tr>
                </tbody >
            </table>
            {status !== 'received' && <p className='text-semibold'>Σέσιον:</p>}
            <div className='flex flex-wrap justify-start space-x-5 items-center'>
                {sessionData.map((session, index) => (
                    <div key={index} className='card card-compact min-w-80 rounded-2xl border border-primary'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Χρήστης</th>
                                    <th>{session.username}</th>
                                </tr>

                                <tr>
                                    <th>Τύπος</th>
                                    <th>{session.sessionType}</th>
                                </tr>

                                <tr>
                                    <th>Ώρα εκκίνησης</th>
                                    <th>{session.startTime}</th>
                                </tr>

                                <tr>
                                    <th>Ώρα σταματημού</th>
                                    <th>{session.endTime}</th>
                                </tr>

                                <tr>
                                    <th>Κατάσταση</th>
                                    <th>{session.status}</th>
                                </tr>
                                <tr>
                                    <th>Αρχικό frame</th>
                                    <th>{session.startPage}</th>
                                </tr>
                                <tr>
                                    <th>Τελικό frame</th>
                                    <th>{session.stopPage}</th>
                                </tr>
                                <tr>
                                    <th>Scanner id</th>
                                    <th>{session.scannerId}</th>
                                </tr>
                            </tbody >
                        </table>

                    </div>
                ))}
            </div>

        </div >
    );
}

export default ViewBook;