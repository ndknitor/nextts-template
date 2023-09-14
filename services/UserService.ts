import appxios, { fetcher } from "@/components/AxiosInterceptor";
import User from "@/objects/entities/User";
import { PagingResponse } from "@/objects/responses/PagingResponse";
import { Dispatch, SetStateAction } from "react";
import Service from "./Service";
const tag = "User";
const revalidate = 60;
const context = "/api/user";
export default class UserService extends Service {
    setLoading: Dispatch<SetStateAction<boolean>>;
    constructor(setLoading?: Dispatch<SetStateAction<boolean>>) {
        super()
        this.setLoading = setLoading ? setLoading : () => false;
    }
    async get(page: number, size: number = 50) {
        if (window) {
            return (await appxios.get<PagingResponse<User>>(context, { loadAction: { setLoading: this.setLoading } })).data;
        }
        else {
            this.setLoading(true);
            const result = await fetcher.fetch(context, { next: { revalidate: revalidate, tags: [tag] } });
            this.setLoading(false);
            return (await result.json()) as PagingResponse<User>;
        }
    }
    insert(user: User) {

    }
    update(user: User) {
    }
    delete(user: User) {
    }
}