import { Seat } from "@/objects/entities/Seat";
import PagingRequest from "@/objects/requests/PagingRequest";
import PagingResponse from "@/objects/responses/PagingResponse";
import RangeResponse from "@/objects/responses/RangeResponse";
import { apiFetch } from "@/utils/function";
import queryString from "query-string";

export interface ISeatService {
    getPaging: (request: PagingRequest<Seat>) => Promise<PagingResponse<Seat>>;
    getByIds: (seatIds: number[]) => Promise<RangeResponse<Seat>>;
}
export const seatService : ISeatService =
{
    getPaging,
    getByIds
};

const context = "seats";
const tags = [context];
const revalidate = 3600;

async function getPaging(request: PagingRequest<Seat>) {
    request.orderBy = Boolean(request.orderBy) ? request.orderBy : ["seatId"];
    const response = await apiFetch(`${context}?${queryString.stringify(request)}`, { next: { revalidate: revalidate, tags: tags, } });
    return await (response.json() as Promise<PagingResponse<Seat>>);
}
async function getByIds(seatIds: number[]) {
    const response = await apiFetch(`${context}/range?${queryString.stringify({ seatIds: seatIds })}`, { next: { revalidate: revalidate, tags: tags } });
    return await (response.json() as Promise<PagingResponse<Seat>>);
}