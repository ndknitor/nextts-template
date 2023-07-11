import { AxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction } from 'react'

declare module 'axios' {
    export interface AxiosRequestConfig {
        loadAction?: {
            loadingLock?: boolean;
            setLoading?: Dispatch<SetStateAction<boolean>>;
        }
    }
    export interface InternalAxiosRequestConfig<any> {
        loadAction?: {
            loadingLock?: boolean;
            setLoading?: Dispatch<SetStateAction<boolean>>;
        }
    }
}