import { CSeat, RSeat, USeat } from "@/objects/entities/Seat";
import OffsetPagingRequest from "@/objects/requests/OffsetPagingRequest";
import PagingResponse from "@/objects/responses/PagingResponse";
import RangeResponse from "@/objects/responses/RangeResponse";
import fetcker from "@/utils/fetcker";
import queryString from "query-string";

const context = "seats";
const tags = [context];
const revalidate = 1;

async function getPaging(request: OffsetPagingRequest<RSeat>) {
    request.orderBy = Boolean(request.orderBy) ? request.orderBy : ["seatId"];
    return await fetcker.get<PagingResponse<RSeat>>(`${context}?${queryString.stringify(request)}`);
}
async function getByIds(seatIds: number[]) {
    return await fetcker.get<RangeResponse<RSeat>>(`${context}/range?${queryString.stringify({ seatIds: seatIds })}`, { next: { revalidate: revalidate, tags: tags } });
}
async function insert(seats: CSeat[]) {
    return await fetcker.post<RangeResponse<RSeat>>(`${context}`, seats);
}
async function update(seats: USeat[]) {
    return await fetcker.put<RangeResponse<RSeat>>(`${context}`, seats);
}
async function remove(seatIds: number[]) {
    return await fetcker.delete<RangeResponse<RSeat>>(`${context}?${queryString.stringify({ seatId: seatIds })}`);
}

const seatService =
{
    getPaging,
    getByIds,
    insert
};

export default seatService;