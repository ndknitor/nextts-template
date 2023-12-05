import StandardReponse from "./StandardReponse";

type RangeResponse<T> = StandardReponse & {
    data: T[];
}
export default RangeResponse;