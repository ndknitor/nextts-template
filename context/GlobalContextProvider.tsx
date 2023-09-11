'use client'
import React from "react";
import { createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
})

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
    const [userId, setUserId] = useState('');
    return (
        <GlobalContext.Provider value={{ userId, setUserId }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                {children}
            </LocalizationProvider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);