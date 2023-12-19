'use client'
import React, { useEffect } from "react";
import { createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren } from "react";
import { AxiosInterceptor } from "./AxiosInterceptor";

interface ContextProps {

}

const GlobalContext = createContext<ContextProps>({

})

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {

    useEffect(() => {

    }, []);
    return (
        <GlobalContext.Provider value={{ }}>
            <AxiosInterceptor>
                {children}
            </AxiosInterceptor>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);