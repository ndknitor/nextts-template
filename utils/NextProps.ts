export interface NextPageProps<TParams, TSearchParams>  {
    params: TParams;
    searchParams: TSearchParams;
}
export interface NextErrorProps {
    error : {
        digest : number;
    }
    reset : () => void;
}