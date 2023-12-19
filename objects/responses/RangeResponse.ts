import StandardResponse from "./StandardResponse";

export default interface RangeResponse<T> extends StandardResponse {
    data: T[];
}