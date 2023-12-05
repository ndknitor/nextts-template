import StandardReponse from "./StandardReponse";

type SingleResponse<T> = StandardReponse & {
    data: T;
}
export default SingleResponse;