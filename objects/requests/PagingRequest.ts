export default class PagingRequest<T> {
    orderBy: Array<keyof T> = [];
    desc: boolean[] = [];
    page: number = 1;
    size: number = 0;

    constructor(self: PagingRequest<T>) {
        if (self.page && Boolean(parseInt(self.page.toString()))) {
            this.page = self.page;
        }
        else {
            this.page = 1;
        }
        if (self.size && Boolean(parseInt(self.size.toString()))) {
            this.size = self.size;
        }
        else {
            this.size = parseInt(process.env.NEXT_PUBLIC_MAXPAGE.toString());
        }
    }
}