export default interface PagingRequest<T> {
    orderBy: Array<keyof T>;
    desc: boolean[];
    page?: number;
    size?: number;
}