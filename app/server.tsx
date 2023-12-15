interface OrderByInformation<T> {
    orderBy: keyof T;
    desc: boolean;
}