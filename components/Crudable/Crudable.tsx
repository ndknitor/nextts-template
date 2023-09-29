import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Modal, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import React, { CSSProperties, FC, ForwardRefExoticComponent, ReactNode, RefAttributes, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useIsFirstRender } from 'usehooks-ts';
import { AnyObject, Maybe, ObjectSchema } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';

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
interface CrudableProps<T extends Maybe<AnyObject> & Object> {
    fetchData: (page: number, orderBy?: keyof T, desc?: boolean) => CrudableFetchResponse<T> | Promise<CrudableFetchResponse<T>>;

    insertAction?: () => boolean | Promise<boolean>;
    updateAction?: (value: T) => T | undefined | Promise<T> | Promise<undefined>;
    deleteAction?: (value: T) => boolean | Promise<boolean>;

    fetchForProps?: Array<FetchForProps<T>>;
    showProps?: Array<keyof T>;
    inputProps?: Array<keyof T>;

    schema?: ObjectSchema<T>;
    title?: string | ReactNode;
    header?: string[] | ReactNode[];
    renderForProps?: Array<RenderForProps<T>>;
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
    multipleSelectedAction?: MultipleSelectedAction<T>[];
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
    background: "#faf8f7",
    right: 0,
}

function createCrudable<T extends Maybe<AnyObject> & Object>(): ForwardRefExoticComponent<CrudableProps<T> & RefAttributes<CrudableRef<T>>> {
    return forwardRef<CrudableRef<T>, CrudableProps<T>>(
        function <T extends Maybe<AnyObject> & Object>(props: CrudableProps<T>, ref: React.Ref<CrudableRef<T>>) {
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
                if (obj === null || obj === undefined || typeof obj === "function" || obj instanceof File) {
                    return "";
                }
                if (typeof obj == "string") {
                    return obj;
                }
                if (typeof obj == "number") {
                    return obj.toString();
                }
                if (isNaN(obj as number)) {
                    return "";
                }
                if (typeof obj == "object") {
                    return (
                        <p>
                            [Object]
                        </p>
                    );
                }
                if (Array.isArray(obj)) {
                    return (
                        <p>
                            [Array]
                        </p>
                    )
                }
                return "";
            }
            const columns = (): string[] => {
                const cols: string[] = [];
                if (data.length > 0) {
                    for (const key in data[0]) {
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
                    <TableContainer style={{ boxShadow: "3px 2px 3px grey", borderRadius: 12, ...props.containerStyle }}>
                        <Table >
                            <TableHead style={{ backgroundColor: '#faf8f7', ...props.headerStyle }}>
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
                                                            <h3>{item}</h3>
                                                        )
                                                }

                                            </TableCell>
                                        )
                                    }
                                    {
                                        props.deleteAction &&
                                        <TableCell style={{ ...sticky, width: 10 }}>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    }
                                    {
                                        props.updateAction &&
                                        <TableCell style={{ ...sticky, width: 10 }}>
                                            <IconButton aria-label="edit">
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                    }


                                </TableRow>
                            </TableHead>
                            <TableBody style={props.bodyStyle}>
                                {data.map((row) => (
                                    <TableRow>
                                        {
                                            Object.keys(row as Object).map(item =>
                                                <TableCell align="left" >
                                                    {displayCell(row![item])}
                                                </TableCell>
                                            )
                                        }
                                        {
                                            props.deleteAction &&
                                            <TableCell style={{ ...sticky, width: 5 }}>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon color='error' />
                                                </IconButton>
                                            </TableCell>
                                        }
                                        {
                                            props.updateAction &&
                                            <TableCell style={{ ...sticky, width: 5 }}>
                                                <IconButton color='warning' aria-label="edit">
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                        }

                                    </TableRow>
                                ))}
                                {tableLoading && <CircularProgress />}
                            </TableBody>
                            <TableFooter style={{ ...props.footerStyle }}>
                                <TableRow>
                                    <TableCell colSpan={columns().length + 2} style={{ alignItems: "flex-end" }} >
                                        <Pagination count={maxPage} page={page} onChange={(e, p) => fetchData(p)} showFirstButton showLastButton />
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer >

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


export default createCrudable