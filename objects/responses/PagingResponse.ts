import RangeResponse from "./RangeResponse";

export default interface PagingResponse<T> extends RangeResponse<T> {
    total : number;
    maxPage: number;
}