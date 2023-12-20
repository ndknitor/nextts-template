'use client';
import axios, { AxiosError,  AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {  PropsWithChildren,  createContext, useContext, useEffect, useState } from 'react'
import React from 'react';
import { toast } from 'react-toastify';

const appxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: process.env.NEXT_PUBLIC_REQUEST_TIMEOUT | 3000,
    validateStatus: () => true
});

export function setAuthorizationBearer(jwt?: string) {
    if (jwt) {
        appxios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    else {
        delete appxios.defaults.headers.common['Authorization'];
    }
}

const AxiosLoadingContext = createContext<{ loading: boolean }>({ loading: false });
export function useAxiosLoading() {
    return useContext(AxiosLoadingContext).loading;
}

export function AxiosInterceptor({ children }: PropsWithChildren) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const beforeRequest = (config: InternalAxiosRequestConfig<any>) => {
            setLoading(true);
            return config;
        }
        const requestError = (error: any) => {
            return Promise.reject(error);
        }
        const onResponse = (response: AxiosResponse<any, any>) => {

            setLoading(false);
            console.log(`Path: ${response.config.url}; Method:${response.config.method}; Status: ${response.status};
            Body:${response.config.data}`);
            return response;
        }
        const onResponseError = (error: AxiosError) => {
            setLoading(false);
            let message = "";
            if (error.code == "ERR_NETWORK") {
                message = "";
            }
            else if (error.code == "ECONNABORTED") {
                message = "";
            }
            console.log(message);
            toast.error(message, {
                position: 'bottom-right'
            });
            return Promise.resolve(error);
        }
        appxios.interceptors.request.use(beforeRequest, requestError);
        const interceptor = appxios.interceptors.response.use(onResponse, onResponseError);
        return () => appxios.interceptors.response.eject(interceptor);
    }, []);
    return (
        <AxiosLoadingContext.Provider value={{ loading }}>
            {children}
        </AxiosLoadingContext.Provider>
    )
}


export default appxios;