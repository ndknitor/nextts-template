'use client'
import Languages from "@/languages";
import React, { useEffect } from "react";
import { createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren } from "react";
import { AxiosInterceptor } from "./AxiosInterceptor";

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

    useEffect(() => {

    }, []);
    return (
        <GlobalContext.Provider value={{ iso, setISO, languages: Languages[iso] }}>
            <AxiosInterceptor>
                {children}
            </AxiosInterceptor>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);