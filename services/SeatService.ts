import { CSeat, RSeat, USeat } from "@/objects/entities/Seat";
import PagingRequest from "@/objects/requests/PagingRequest";
import PagingResponse from "@/objects/responses/PagingResponse";
import RangeResponse from "@/objects/responses/RangeResponse";
import { FetchResponse, apiDelete, apiGet, apiPost, apiPut } from "@/utils/FetchApi";
import queryString from "query-string";

export const seatService =
{
    getPaging,
    getByIds,
    insert
};

const context = "seats";
const tags = [context];
const revalidate = 1;

async function getPaging(request: PagingRequest<RSeat>) {
    request.orderBy = Boolean(request.orderBy) ? request.orderBy : ["seatId"];
    return await apiGet<PagingResponse<RSeat>>(`${context}?${queryString.stringify(request)}`);
}
async function getByIds(seatIds: number[]) {
    return await apiGet<RangeResponse<RSeat>>(`${context}/range?${queryString.stringify({ seatIds: seatIds })}`, { next: { revalidate: revalidate, tags: tags } });
}
async function insert(seats: CSeat[]) {
    return await apiPost<RangeResponse<RSeat>>(`${context}`, seats);
}
async function update(seats: USeat[]) {
    return await apiPut<RangeResponse<RSeat>>(`${context}`, seats);
}
async function remove(seatIds: number[]) {
    return await apiDelete<RangeResponse<RSeat>>(`${context}?${queryString.stringify({ seatId: seatIds })}`);
}