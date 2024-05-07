import { useContext } from 'react';
import ScanContext from '../context/ScanContext';

const useScan = () => {
    return useContext(ScanContext);
};

export default useScan;