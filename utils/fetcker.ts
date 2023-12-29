import { createFetcker } from "fetcker";
import { toast } from "react-toastify";

const fetcker = createFetcker({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    requestTimeOut: parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT.toString()),
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