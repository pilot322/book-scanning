import React from 'react';

function QualityCheck() {
    return (
        <div className='flex flex-col w-full'>
            <h1 className="mb-6 text-4xl font-bold">Έλεγχος ποιότητας</h1>

            <span className='text-2xl font-semibold'>Αναμονή σύνδεσης με quality client <span className="loading loading-bars loading-xs"></span></span>
        </div>
    );
}

export default QualityCheck;