import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import React, { CSSProperties, ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useIsFirstRender } from 'usehooks-ts';
import { AnyObject, Maybe, ObjectSchema } from 'yup';

interface CrudableFetchResponse<T> {
    data: T[];
    maxPage: number;
}
type FetchForProps<T> = {
    [K in keyof T]: () => CrudableFetchResponse<T[K]> | Promise<CrudableFetchResponse<T[K]>>;
};
type RenderForProps<T> = {
    [K in keyof T]: (value: T[K]) => JSX.Element;
};
type RelationshipDisplayMember<T> = {
    [K in keyof T]: T[K];
};
interface MultipleSelectedAction<T> {
    node: ReactNode;
    action: (item: T[]) => boolean | Promise<boolean>;
}
interface CrudableProps<T extends Maybe<AnyObject>> {
    fetchData: (page: number, orderBy?: keyof T, desc?: boolean) => CrudableFetchResponse<T> | Promise<CrudableFetchResponse<T>>;

    insertAction?: () => boolean | Promise<boolean>;
    updateAction?: (value: T) => boolean | Promise<boolean>;
    deleteAction?: (value: T) => boolean | Promise<boolean>;

    fetchForProps?: Array<FetchForProps<T>>;
    showProps?: Array<keyof T>;
    inputProps?: Array<keyof T>;

    schema?: ObjectSchema<T>;
    title?: string | ReactNode;
    header?: string[] | ReactNode[];
    renderForProps: Array<RenderForProps<T>>;
    insertButton?: ReactNode;
    updateButton?: ReactNode;
    deleteButton?: ReactNode;
    pagination?: (page: number, maxPage: number) => JSX.Element;

    confirmOnInsert?: boolean;
    confirmOnUpdate?: boolean;
    confirmOnDelete?: boolean;

    copyButtonForString?: boolean;
    infiniteScroll?: boolean;
    infiniteRecycleScroll?: boolean;
    multipleSelectedAction: MultipleSelectedAction<T>[];
    keyRelationshipDisplayMember?: RelationshipDisplayMember<T>[];
    sortable?: boolean;

    containerStyle?: CSSProperties;
    headerStyle?: CSSProperties;
    bodyStyle?: CSSProperties;
    footerStyle?: CSSProperties;
}
export interface CrudableRef<T> {
    reset: () => void | Promise<void>;
    changeRow: () => T;
}
const sticky: CSSProperties = {
    position: "sticky",
    left: 0,
    background: "white",
    boxShadow: "5px 2px 5px grey",
    borderRight: "2px solid black"
}
function Crudable<T extends Maybe<AnyObject>>(props: CrudableProps<T>) {
    return forwardRef<CrudableRef<T>, CrudableProps<T>>(
        function <T extends Maybe<AnyObject>>(props: CrudableProps<T>, ref: React.Ref<CrudableRef<T>>) {
            const [data, setData] = useState<T[]>([]);
            const [selectedData, setSelectedData] = useState<T>();
            const [page, setPage] = useState(1);
            const [maxPage, setMaxPage] = useState(1);
            const [orderBy, setOrderBy] = useState<keyof T | undefined>(undefined);
            const [desc, setDesc] = useState<boolean>(true);
            const [tableLoading, setTableLoading] = useState(false);
            const [modalLoading, setModalLoading] = useState(false);
            const [modalShowed, setModalShowed] = useState(false);
            const [hasMore, setHasMore] = useState(false);
            const [noData, setNoData] = useState(false);
            const [dialogShowed, setDialogShowed] = useState(false);

            const firstRender = useIsFirstRender();
            useEffect(() => {
                if (firstRender) {
                    fetchData(1);
                }
                else {
                    fetchData(page);
                }
            }, [orderBy, desc]);

            const fetchData = async (page: number) => {
                setTableLoading(true);
                const fetchedData = await props.fetchData(page, orderBy, desc);
                setNoData(fetchedData.data.length == 0 && page == 1);
                setData(fetchedData.data);
                setPage(page);
                setMaxPage(fetchedData.maxPage);
                setHasMore(fetchedData.maxPage > page);
                setTableLoading(false);
            };

            const fetchFromProps = () => {
                fetchData(1);
            };
            const changeRow = () => {
                return {} as T;
            }
            useImperativeHandle(ref, () => ({
                reset: fetchFromProps,
                changeRow: changeRow
            }));

            const displayCell = (obj: Object): string | ReactNode => {
                if (obj == null || obj == undefined || isNaN(obj as number) || typeof obj == "function" || obj instanceof File) {
                    return "";
                }
                if (typeof obj == "string") {
                    return obj;
                }
                if (typeof obj == "number") {
                    return obj.toString();
                }
                if (typeof obj == "object") {
                    return (
                        <h1>
                            Object
                        </h1>
                    );
                }
                if (Array.isArray(obj)) {
                    return (
                        <h1>
                            Array
                        </h1>
                    )
                }
                return "";
            }
            const columns = (): string[] => {
                const instance: T = {} as T;
                const cols: string[] = [];
                const obj: Object = instance as Object;
                type Keys = keyof T;
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        cols.push(key);
                    }
                }
                return cols;
            }
            const openModal = (item?: T) => {
                setSelectedData(item);
                setModalShowed(true);
            }
            const openDialog = () => {
                setDialogShowed(true);
            }

            return (
                <>
                    <TableContainer style={props.containerStyle}>
                        <Table>
                            <TableHead style={props.headerStyle}>
                                <TableRow>
                                    {
                                        columns().map(item =>
                                            <TableCell align="left">
                                                {
                                                    props.sortable ?
                                                        (
                                                            <TableSortLabel
                                                                active={orderBy === item}
                                                                direction={desc ? 'desc' : 'asc'}
                                                                onClick={() => setOrderBy(item as keyof T)}>
                                                                {item}
                                                            </TableSortLabel>
                                                        )
                                                        :
                                                        (
                                                            <>{item}</>
                                                        )
                                                }

                                            </TableCell>
                                        )
                                    }
                                    {
                                        props.updateAction &&
                                        <TableCell style={{ ...sticky, width: 10 }}>
                                            U
                                        </TableCell>
                                    }
                                    {
                                        props.deleteAction &&
                                        <TableCell style={{ ...sticky, width: 10 }}>
                                            D
                                        </TableCell>
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody style={props.bodyStyle}>
                                {data.map((row) => (
                                    <TableRow>
                                        {
                                            Object.keys(row as Object).map(item =>
                                                <TableCell align="left">
                                                    {displayCell(row![item])}
                                                </TableCell>
                                            )
                                        }
                                        {
                                            props.updateAction &&
                                            <TableCell style={{ ...sticky, width: 10 }}>
                                                <IconButton name='edit' />
                                            </TableCell>
                                        }
                                        {
                                            props.deleteAction &&
                                            <TableCell style={{ ...sticky, width: 10 }}>
                                                <IconButton name='delete' />
                                            </TableCell>
                                        }
                                    </TableRow>
                                ))}
                                {tableLoading && <CircularProgress />}
                            </TableBody>
                            <TableFooter style={props.footerStyle}>
                                <Pagination count={maxPage} page={page} showFirstButton showLastButton />
                            </TableFooter>
                        </Table>
                    </TableContainer>

                    <Modal
                        keepMounted
                        open={modalShowed}
                        onClose={() => setModalShowed(false)}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>

                    <Dialog
                        open={dialogShowed}
                        keepMounted
                        onClose={() => setDialogShowed(false)}
                        aria-describedby="alert-dialog-slide-description">
                        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Let Google help apps determine location. This means sending anonymous
                                location data to Google, even when no apps are running.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogShowed(false)}>Disagree</Button>
                            <Button onClick={() => setDialogShowed(false)}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </>
            );
        }
    );
}

export default Crudable