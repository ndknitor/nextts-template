export interface FetchResponse<T> extends Response {
    data: T;
}
export async function apiGet<T>(url: string, init?: RequestInit) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, init);
    const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
    return result;
}
export async function apiPost<T>(url: string, data: unknown, init?: RequestInit) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
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
export async function apiPostForm<T>(url: string, formData: FormData, init?: RequestInit) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        ...init,
        method: 'POST',
        body: formData,
    });

    const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
    return result;
}
export async function apiPut<T>(url: string, data: unknown, init?: RequestInit) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
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
export async function apiPutForm<T>(url: string, formData: FormData, init?: RequestInit) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        ...init,
        method: 'PUT',
        body: formData,
    });

    const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
    return result;
}
export async function apiPatch<T>(url: string, data: unknown, init?: RequestInit) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
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
export async function apiPatchForm<T>(url: string, formData: FormData, init?: RequestInit) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        ...init,
        method: 'PATCH',
        body: formData,
    });

    const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
    return result;
}
export async function apiDelete<T>(url: string, init?: RequestInit) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        ...init,
        method: 'DELETE',
    });

    const result: FetchResponse<T> = { ...response, data: await (response.json() as Promise<T>) };
    return result;
}