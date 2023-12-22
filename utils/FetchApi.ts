import { toast } from "react-toastify";

function onConnectionTimeOut() {
    isClient() && toast.error("Internet connection error, please try again later");
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const isClient = () => typeof window !== 'undefined';
export interface FetchResponse<T> extends Response {
    data: T;
}
export async function apiGet<T>(url: string, init?: RequestInit) {
    try {
        const response = (await fetch(`${BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init
        })) as FetchResponse<T>;
        response.data = await (response.json() as Promise<T>);
        return response;
    }
    catch (e: any) {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPost<T>(url: string, data: unknown, init?: RequestInit) {
    try {
        const response = (await fetch(`${BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'POST',
            headers: {
                ...(init?.headers || {}),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })) as FetchResponse<T>;
        response.data = await (response.json() as Promise<T>);
        return response;
    }
    catch (e) {
        onConnectionTimeOut();
        return responseFactory<T>();
    }

}
export async function apiPostForm<T>(url: string, formData: FormData, init?: RequestInit) {
    try {
        const response = (await fetch(`${BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'POST',
            body: formData,
        })) as FetchResponse<T>;
        response.data = await (response.json() as Promise<T>);
        return response;
    } catch {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPut<T>(url: string, data: unknown, init?: RequestInit) {
    try {
        const response = (await fetch(`${BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'PUT',
            headers: {
                ...(init?.headers || {}),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })) as FetchResponse<T>;
        response.data = await (response.json() as Promise<T>);
        return response;
    }
    catch {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPutForm<T>(url: string, formData: FormData, init?: RequestInit) {
    try {
        const response = (await fetch(`${BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'PUT',
            body: formData,
        })) as FetchResponse<T>;
        response.data = await (response.json() as Promise<T>);
        return response;
    }
    catch
    {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPatch<T>(url: string, data: unknown, init?: RequestInit) {
    try {
        const response = (await fetch(`${BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'PATCH',
            headers: {
                ...(init?.headers || {}),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })) as FetchResponse<T>;
        response.data = await (response.json() as Promise<T>);
        return response;
    }
    catch
    {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiPatchForm<T>(url: string, formData: FormData, init?: RequestInit) {
    try {
        const response = (await fetch(`${BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'PATCH',
            body: formData,
        })) as FetchResponse<T>;
        response.data = await (response.json() as Promise<T>);
        return response;
    } catch {
        onConnectionTimeOut();
        return responseFactory<T>();
    }
}
export async function apiDelete<T>(url: string, init?: RequestInit) {
    try {
        const response = (await fetch(`${BASE_URL}${url}`, {
            signal: AbortSignal.timeout(parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString())),
            ...init,
            method: 'DELETE',
        })) as FetchResponse<T>;
        response.data = await (response.json() as Promise<T>);
        return response;
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
        status: HttpStatusCode.RequestTimeout,
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

export enum HttpStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    URITooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HTTPVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511,
}