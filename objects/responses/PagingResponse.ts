import RangeResponse from "./RangeResponse";

type PagingResponse<T> = RangeResponse<T> & {
    maxPage: number;
    total: number;
}
export default PagingResponse;