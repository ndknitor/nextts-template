import appxios from "@/components/AxiosInterceptor";
import User from "@/objects/entities/User";
import { PagingResponse } from "@/objects/responses/PagingResponse";
import { Dispatch, SetStateAction, use } from "react";
import Service from "./Service";
import SingleResponse from "@/objects/responses/SingleResponse";
import { fetcher } from "@/utils/Fetcher";
const tags = ["User"];
const revalidate = 60;
const context = "/api/user";
export default class UserService extends Service {
    setLoading: Dispatch<SetStateAction<boolean>>;
    constructor(setLoading?: Dispatch<SetStateAction<boolean>>) {
        super()
        this.setLoading = setLoading ? setLoading : () => false;
    }
    async get(page: number, size: number = 50) {
        const result = await fetcher.fetch('/main?page=' + page, { next: { revalidate: revalidate, tags: tags } });
        return (await result.json()) as number[];
    }
    async insert(user: User) {
        return await appxios.post<SingleResponse<User>>(context, user, { loadAction: { setLoading: this.setLoading } });
    }
    async update(user: User) {
        return await appxios.post<SingleResponse<User>>(context, user, { loadAction: { setLoading: this.setLoading } });
    }
    async delete(userId: number) {
        return await appxios.delete<SingleResponse<User>>(context, { loadAction: { setLoading: this.setLoading } });
    }
}