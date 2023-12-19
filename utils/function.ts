export const isClient = () => typeof window == "undefined";
export function apiFetch(url: string, init?: RequestInit) {
    return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, init);
}

export function range(start: number, end: number) {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
        result.push(parseInt(i.toString()));
    }
    return result;
}