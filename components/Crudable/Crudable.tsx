import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { CSSProperties, forwardRef } from 'react';
interface CrudableFetchResponse<T> {
    data: T[];
    maxPage: number;
}
interface CrudableProps<T> {
    fetchData: (page: number) => CrudableFetchResponse<T> | Promise<CrudableFetchResponse<T>>;
    insertAction?: () => void | Promise<void>;
    updateAction?: (value: T) => void | Promise<void>;
    deleteAction?: (value: T) => void | Promise<void>;
    labels?: string[];
    confirmOnInsert?: boolean;
    confirmOnUpdate?: boolean;
    confirmOnDelete?: boolean;
}
export interface CrudableRef {
    fetch: () => void;
}
const sticky: CSSProperties = {
    position: "sticky",
    left: 0,
    background: "white",
    boxShadow: "5px 2px 5px grey",
    borderRight: "2px solid black"
}
function Crudable<T>(props: CrudableProps<T>) {
    return forwardRef<CrudableRef, CrudableProps<T>>(
        function <T>(props: CrudableProps<T>, ref: React.Ref<CrudableRef>) {
            return (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Calories</TableCell>
                                <TableCell align="left">Fat&nbsp;(g)</TableCell>
                                <TableCell style={{ ...sticky, width: 10 }}>
                                    U
                                </TableCell>
                                <TableCell style={{ ...sticky, width: 10 }}>
                                    D
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map((row) => (
                                <TableRow>
                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.age}</TableCell>
                                    <TableCell style={{ ...sticky, width: 10 }}>
                                        U
                                    </TableCell>
                                    <TableCell style={{ ...sticky, width: 10 }}>
                                        D
                                    </TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    );
}

export default Crudable