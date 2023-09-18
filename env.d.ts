declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_BASE_URL: string;
        NEXT_PUBLIC_REQUEST_TIMEOUT: number;
        NEXT_PUBLIC_MAXPAGE : number;
    }
}