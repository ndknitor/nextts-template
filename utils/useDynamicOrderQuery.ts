import queryString from "query-string";
import { useCallback, useState } from "react";

interface OrderByInformation<T> {
    orderBy: keyof T;
    desc: boolean;
}
export function useDynamicOrderQuery<T, Q>(initQuery: Q, initOrder: OrderByInformation<T>[]) {
    const [query, setQuery] = useState(initQuery);
    const [orderBy, setOrderBy] = useState<OrderByInformation<T>[]>(initOrder);
    const mergeOrderBy = useCallback((newOrderby: OrderByInformation<T>) => {
        setOrderBy(prevOrders => {
            const index = prevOrders.findIndex(f => f.orderBy === newOrderby.orderBy);
            if (index !== -1) {
                return prevOrders.map((f, i) => (i === index ? newOrderby : f));
            } else {
                return [...prevOrders, newOrderby];
            }
        });
    }, []);
    const replaceOrderBy = useCallback((replacer: OrderByInformation<T>, index: number) => {
        setOrderBy(prevOrderBy => {
            if (index >= 0 && index < prevOrderBy.length) {
                const updatedOrderBy = [...prevOrderBy];
                updatedOrderBy[index] = replacer;
                return updatedOrderBy;
            } else {
                return prevOrderBy;
            }
        });
    }, []);
    const deleteOrderBy = useCallback((orderByToDelete: keyof T) => {
        setOrderBy(prevOrders => {
            const updatedOrders = prevOrders.filter(f => f.orderBy !== orderByToDelete);
            return updatedOrders;
        });
    }, []);
    const getQueryString = useCallback(() => {
        return queryString.stringify({ ...query, orderBy: orderBy.map(o => o.orderBy), desc: orderBy.map(o => o.desc) });
    }, []);

    return {
        query,
        setQuery,
        getQueryString,
        orderBy,
        mergeOrderBy,
        replaceOrderBy,
        deleteOrderBy
    };
}