import { useContext } from "react";
import { AuthorizeContext } from "../../context/AuthorizeContextProvider";
import { useEffectOnce } from "usehooks-ts";

export default function useAuthorizeInit() {
    const { setInitLoading, initLoading } = useContext(AuthorizeContext);
    useEffectOnce(() => {
        if (initLoading) {
            setInitLoading(false);
        }
    });
}