class FetchWrapper {
    private baseUrl: string;
    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    }
    async fetch(url: string, options?: RequestInit): Promise<Response> {
        const fullUrl = this.baseUrl + url;
        return fetch(fullUrl, options);
    }
}
export const fetcher = new FetchWrapper();