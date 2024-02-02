import { NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_REQUEST_TIMEOUT } from "@/env";
import { createFetcker } from "fetcker";
import { toast } from "react-toastify";

const fetcker = createFetcker({
    baseUrl: NEXT_PUBLIC_API_BASE_URL,
    requestTimeOut: NEXT_PUBLIC_REQUEST_TIMEOUT,
    onError: (error, isClient) => {
        if (isClient) {
            let message = "";
            switch (error.name) {
                case "TypeError": message = "Network connection error";
                    break;
                case "AbortError": message = "Request time out";
                    break;
            }
            toast.error(message);
        }
        else {
            console.log(error);
        }
    }
});

export default fetcker;