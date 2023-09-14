import { Dispatch, SetStateAction } from "react";

export default abstract class Service {
    abstract setLoading: Dispatch<SetStateAction<boolean>>;
}