import React, { createContext, useState, useContext } from 'react';

const ScanContext = createContext();

export const ScanProvider = ({ children }) => {
    const [isScanning, setIsScanning] = useState(false);

    return (
        <ScanContext.Provider value={{ isScanning, setIsScanning }}>
            {children}
        </ScanContext.Provider>
    );
};

export default ScanContext;