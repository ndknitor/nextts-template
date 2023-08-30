import StandardReponse from "./StandardReponse";

export interface RangeResponse<T> extends StandardReponse {
    data: T[];
}