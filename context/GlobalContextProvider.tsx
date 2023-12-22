'use client'
import React from "react";
import { createContext, useContext, PropsWithChildren } from "react";
import { useInitEffect } from 'ndknitor-ts/hooks'
interface ContextProps {

}

const GlobalContext = createContext<ContextProps>({

})

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {

    useInitEffect(() => {

    });
    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);