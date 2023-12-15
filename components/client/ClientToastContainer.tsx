'use client'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ClientToastContainer() {
    const [showed, setShowed] = useState(false);
    useEffect(() => {
        setShowed(true);
    }, []);
    if (showed) {
        return (
            <ToastContainer />
        )
    }
    else {
        return (
            <></>
        );
    }
}

export default ClientToastContainer