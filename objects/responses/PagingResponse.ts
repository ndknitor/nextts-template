import { RangeResponse } from "./RangeResponse";

export interface PagingResponse<T> extends RangeResponse<T> {
    data: T[];
    maxPage: number;
    totalRecord: number;
}