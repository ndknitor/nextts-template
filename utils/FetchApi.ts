import { toast } from "react-toastify";

function onConnectionTimeOut() {
    isClient() && toast.error("Internet connection error, please try again later");
}


const isClient = () => typeof window !== 'undefined';
export interface FetchResponse<T> extends Response {
    data: T;
}
export async function apiGet<T>(url: string, init?: RequestInit) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init
        });
        console.log(response);
        
        const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
        return result;
    }
    catch(e : any)
    {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPost<T>(url: string, data: unknown, init?: RequestInit) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'POST',
            headers: {
                ...(init?.headers || {}),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
        return result;
    }
    catch (e) {
        onConnectionTimeOut();
        return responseFactory<T>();
    }

}
export async function apiPostForm<T>(url: string, formData: FormData, init?: RequestInit) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'POST',
            body: formData,
        });

        const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
        return result;
    } catch {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPut<T>(url: string, data: unknown, init?: RequestInit) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'PUT',
            headers: {
                ...(init?.headers || {}),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
        return result;
    }
    catch {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPutForm<T>(url: string, formData: FormData, init?: RequestInit) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'PUT',
            body: formData,
        });

        const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
        return result;
    }
    catch
    {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPatch<T>(url: string, data: unknown, init?: RequestInit) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'PATCH',
            headers: {
                ...(init?.headers || {}),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
        return result;
    }
    catch
    {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPatchForm<T>(url: string, formData: FormData, init?: RequestInit) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'PATCH',
            body: formData,
        });

        const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
        return result;
    } catch {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiDelete<T>(url: string, init?: RequestInit) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'DELETE',
        });

        const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
        return result;
    }
    catch
    {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}



function responseFactory<T>(): FetchResponse<T> {
    return {
        ok: false,
        status: 0,
        headers: {} as Headers,
        redirected: false,
        statusText: "",
        type: "default",
        url: "",
        clone: function (): Response {
            throw new Error("Function not implemented.");
        },
        body: null,
        bodyUsed: false,
        arrayBuffer: function (): Promise<ArrayBuffer> {
            throw new Error("Function not implemented.");
        },
        blob: function (): Promise<Blob> {
            throw new Error("Function not implemented.");
        },
        formData: function (): Promise<FormData> {
            throw new Error("Function not implemented.");
        },
        json: function (): Promise<any> {
            throw new Error("Function not implemented.");
        },
        text: function (): Promise<string> {
            throw new Error("Function not implemented.");
        },
        data: {} as T
    }
}