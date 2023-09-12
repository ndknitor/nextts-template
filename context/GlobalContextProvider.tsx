'use client'
import React from "react";
import { createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Languages from "@/utils/language";
interface ContextProps {
    languages: typeof Languages.en;
    iso: keyof Languages;
    setISO: Dispatch<SetStateAction<keyof Languages>>;
}

const GlobalContext = createContext<ContextProps>({
    languages: Languages.en,
    iso: "en",
    setISO: (): keyof Languages => "en"
})

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
    const [iso, setISO] = useState<keyof Languages>("en");
    return (
        <GlobalContext.Provider value={{ iso, setISO, languages: Languages[iso] }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                {children}
            </LocalizationProvider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);