// import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel } from '@mui/material';
// import React, { CSSProperties, ForwardRefExoticComponent, HTMLInputTypeAttribute, ReactNode, RefAttributes, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
// import { useIsFirstRender } from 'usehooks-ts';
// import ClearIcon from '@mui/icons-material/Clear';
// import { AnyObject, Maybe, ObjectSchema } from 'yup';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Edit } from '@mui/icons-material';
// import AddIcon from '@mui/icons-material/Add';
// import CrudableValidation from '../CrudableValidation/CrudableValidation';
// import CrudableInput from '../CrudableInput/CrudableInput';
// import CrudableDateInput from '../CrudableDateInput/CrudableDateInput';
// import moment from 'moment-timezone';

// interface CrudableFetchResponse<T> {
//     data: T[];
//     maxPage: number;
// }
// type FetchForProps<T> = {
//     [K in keyof T]: () => CrudableFetchResponse<T[K]> | Promise<CrudableFetchResponse<T[K]>>;
// };
// type RenderForProps<T> = {
//     [K in keyof T]: (value: T[K]) => JSX.Element;
// };
// type RelationshipDisplayMember<T> = {
//     [K in keyof T]: T[K];
// };
// interface MultipleSelectedAction<T> {
//     node: ReactNode;
//     action: (item: T[]) => boolean | Promise<boolean>;
// }
// interface CrudableProps<T extends Maybe<AnyObject> & Object> {
//     fetchData: (page: number, orderBy?: keyof T, desc?: boolean) => CrudableFetchResponse<T> | Promise<CrudableFetchResponse<T>>;
//     initalValue: T;

//     insertAction?: (value: T) => boolean | Promise<boolean>;
//     updateAction?: (value: T) => T | undefined | Promise<T> | Promise<undefined>;
//     deleteAction?: (value: T) => boolean | Promise<boolean>;

//     fetchForProps?: Array<FetchForProps<T>>;
//     showProps?: Array<keyof T>;
//     inputProps?: Array<keyof T>;
//     propLabels?: { prop: keyof T, label: string, readOnly?: boolean, showCopyButton?: boolean }[];

//     schema?: ObjectSchema<T>;
//     title?: string | ReactNode;
//     header?: string[] | ReactNode[];
//     renderForProps?: Array<RenderForProps<T>>;
//     insertButton?: ReactNode;
//     updateButton?: ReactNode;
//     deleteButton?: ReactNode;
//     pagination?: (page: number, maxPage: number) => JSX.Element;
//     onPageNavigation?: (page: number) => void | Promise<void>;

//     confirmOnInsert?: boolean;
//     confirmOnUpdate?: boolean;
//     confirmOnDelete?: boolean;

//     copyButtonForString?: boolean;
//     singleSelected? : boolean;
//     infiniteScroll?: boolean;
//     infiniteRecycleScroll?: boolean;
//     multipleSelectedAction?: MultipleSelectedAction<T>[];
//     keyRelationshipDisplayMember?: RelationshipDisplayMember<T>[];
//     sortable?: boolean;

//     containerStyle?: CSSProperties;
//     headerStyle?: CSSProperties;
//     bodyStyle?: CSSProperties;
//     footerStyle?: CSSProperties;
// }
// export interface CrudableRef<T> {
//     reset: () => void | Promise<void>;
//     changeRow: () => T;
// }
// const sticky: CSSProperties = {
//     position: "sticky",
//     background: "#faf8f7",
//     right: 0,
// }

// function createCrudable<T extends Maybe<AnyObject> & Object>(): ForwardRefExoticComponent<CrudableProps<T> & RefAttributes<CrudableRef<T>>> {
//     return forwardRef<CrudableRef<T>, CrudableProps<T>>(
//         function <T extends Maybe<AnyObject> & Object>(props: CrudableProps<T>, ref: React.Ref<CrudableRef<T>>) {
//             const [data, setData] = useState<T[]>([]);
//             const [selectedData, setSelectedData] = useState<T>();
//             const [page, setPage] = useState(1);
//             const [maxPage, setMaxPage] = useState(1);
//             const [orderBy, setOrderBy] = useState<keyof T | undefined>(undefined);
//             const [desc, setDesc] = useState<boolean>(true);
//             const [tableLoading, setTableLoading] = useState(false);
//             const [modalLoading, setModalLoading] = useState(false);
//             const [modalShowed, setModalShowed] = useState(false);
//             const [hasMore, setHasMore] = useState(false);
//             const [noData, setNoData] = useState(false);
//             const [dialogShowed, setDialogShowed] = useState(false);

//             const firstRender = useIsFirstRender();
//             useEffect(() => {
//                 if (firstRender) {
//                     fetchData(1);
//                 }
//                 else {
//                     fetchData(page);
//                 }
//             }, [orderBy, desc]);

//             const fetchData = async (page: number) => {
//                 setTableLoading(true);
//                 const fetchedData = await props.fetchData(page, orderBy, desc);
//                 setNoData(fetchedData.data.length == 0 && page == 1);
//                 setData(fetchedData.data);
//                 setPage(page);
//                 setMaxPage(fetchedData.maxPage);
//                 setHasMore(fetchedData.maxPage > page);
//                 setTableLoading(false);
//             };

//             const fetchFromProps = () => {
//                 fetchData(1);
//             };
//             const changeRow = () => {
//                 return {} as T;
//             }
//             useImperativeHandle(ref, () => ({
//                 reset: fetchFromProps,
//                 changeRow: changeRow
//             }));

//             const displayCell = (obj: Object): string | ReactNode => {
//                 if (obj === null || obj === undefined || typeof obj === "function" || obj instanceof File) {
//                     return "";
//                 }
//                 if (typeof obj == "string") {
//                     return obj;
//                 }
//                 if (typeof obj == "number") {
//                     return obj.toString();
//                 }
//                 if (isNaN(obj as number)) {
//                     return "";
//                 }
//                 if (Array.isArray(obj)) {
//                     return (
//                         <p>
//                             [Array]
//                         </p>
//                     )
//                 }
//                 if (typeof obj == "object" && obj instanceof Date) {
//                     return moment(obj).format("YYYY:MM:DD hh:mm:ss")
//                 }
//                 return "";
//             }
//             const openModal = (item?: T) => {
//                 setModalShowed(true);
//                 setSelectedData(item);

//             }
//             const openDialog = (item?: T, action: "insert" | "update" | "delete" = "insert") => {
//                 if (action == "insert" || action == "update") {
//                     setDialogShowed(true);
//                     return;
//                 }
//                 if (action == "delete") {
//                     setSelectedData(item);
//                     setDialogShowed(true);
//                     return;
//                 }
//             }
//             const inputKeys = () => {
//                 if (props.inputProps) {
//                     return props.inputProps
//                 }
//                 return Object.keys(props.initalValue);
//             }
//             const showKeys = () => {
//                 if (props.showProps) {
//                     return props.showProps;
//                 }
//                 return Object.keys(props.initalValue);
//             }
//             const labelFromKeys = (key: keyof T) => {
//                 if (!props.propLabels) {
//                     return key;
//                 }
//                 const labelObj = props.propLabels.find(l => l.prop == key);
//                 if (labelObj == undefined) {
//                     return key;
//                 }
//                 return labelObj.label;
//             }
//             const inputFromKey = (key: keyof T): ReactNode => {
//                 const type = typeof props.initalValue[key];
//                 console.log(type);

//                 if (type == "number") {
//                     return (
//                         <CrudableInput
//                             disabled={readOnlyFromKey(key)}
//                             label={labelFromKeys(key) as string}
//                             type='number'
//                         />
//                     );
//                 }
//                 if (props.initalValue[key] as Date) {
//                     return (
//                         <CrudableDateInput
//                             disabled={readOnlyFromKey(key)}
//                         />
//                     )
//                 }
//                 if (props.initalValue[key] as unknown instanceof File) {
//                     return (
//                         <CrudableInput
//                             disabled={readOnlyFromKey(key)}
//                             label={labelFromKeys(key) as string}
//                             type='file'
//                         />
//                     )
//                 }
//                 return (
//                     <CrudableInput
//                         disabled={readOnlyFromKey(key)}
//                         label={labelFromKeys(key) as string}
//                     />
//                 );
//             }
//             const readOnlyFromKey = (key: keyof T): boolean => {
//                 if (!props.propLabels) {
//                     return false;
//                 }
//                 const labelObj = props.propLabels.find(l => l.prop == key);
//                 if (labelObj == undefined) {
//                     return false;
//                 }
//                 return labelObj.readOnly || false;
//             }
//             const onInputSubmit = (value: T) => {

//             }
//             return (
//                 <>
//                     <TableContainer style={{ boxShadow: "1px 2px 4px grey", borderRadius: 12, ...props.containerStyle }}>
//                         <Table >
//                             <TableHead style={{ backgroundColor: '#faf8f7', ...props.headerStyle }}>
//                                 <TableRow>
//                                     {
//                                         props.header ?
//                                             props.header.map(item =>
//                                                 <TableCell align="left">
//                                                     {
//                                                         props.sortable ?
//                                                             (
//                                                                 <TableSortLabel
//                                                                     active={orderBy === item}
//                                                                     direction={desc ? 'desc' : 'asc'}
//                                                                     onClick={() => setOrderBy(item as keyof T)}>
//                                                                     {item}
//                                                                 </TableSortLabel>
//                                                             )
//                                                             :
//                                                             (
//                                                                 <h3>{item}</h3>
//                                                             )
//                                                     }
//                                                 </TableCell>
//                                             )
//                                             :
//                                             showKeys().map(item =>
//                                                 <TableCell align="left">
//                                                     {
//                                                         props.sortable ?
//                                                             (
//                                                                 <TableSortLabel
//                                                                     active={orderBy === item}
//                                                                     direction={desc ? 'desc' : 'asc'}
//                                                                     onClick={() => setOrderBy(item as keyof T)}>
//                                                                     {labelFromKeys(item).toString()}
//                                                                 </TableSortLabel>
//                                                             )
//                                                             :
//                                                             (
//                                                                 <h3>{labelFromKeys(item).toString()}</h3>
//                                                             )
//                                                     }
//                                                 </TableCell>
//                                             )
//                                     }
//                                     {
//                                         props.insertAction &&
//                                         <TableCell colSpan={2} style={{ ...sticky, textAlign: "center" }}>
//                                             <IconButton style={{ backgroundColor: "#2dad26" }} onClick={() => openModal()} size='large'>
//                                                 <AddIcon fontSize='medium' />
//                                             </IconButton>
//                                         </TableCell>
//                                     }
//                                     {
//                                         props.deleteAction && !props.insertAction &&
//                                         <TableCell style={{ ...sticky, width: 10 }}>
//                                             <IconButton size='small' aria-label="delete">
//                                                 <DeleteIcon fontSize='small' />
//                                             </IconButton>
//                                         </TableCell>
//                                     }
//                                     {
//                                         props.updateAction && !props.insertAction &&
//                                         <TableCell style={{ ...sticky, width: 10 }}>
//                                             <IconButton size='small' aria-label="edit">
//                                                 <Edit fontSize='small' />
//                                             </IconButton>
//                                         </TableCell>
//                                     }


//                                 </TableRow>
//                             </TableHead>
//                             <TableBody style={props.bodyStyle}>
//                                 {data.map((row) => (
//                                     <TableRow>
//                                         {
//                                             showKeys().map(item =>
//                                                 <TableCell align="left" >
//                                                     {displayCell(row![item])}
//                                                 </TableCell>
//                                             )
//                                         }
//                                         {
//                                             props.deleteAction &&
//                                             <TableCell style={{ ...sticky, width: 5 }}>
//                                                 <IconButton size='small' aria-label="delete" onClick={() => openDialog(row)}>
//                                                     <DeleteIcon fontSize='small' color='error' />
//                                                 </IconButton>
//                                             </TableCell>
//                                         }
//                                         {
//                                             props.updateAction &&
//                                             <TableCell style={{ ...sticky, width: 5 }}>
//                                                 <IconButton size='small' color='warning' aria-label="edit">
//                                                     <Edit fontSize='small' onClick={() => openModal(row)} />
//                                                 </IconButton>
//                                             </TableCell>
//                                         }

//                                     </TableRow>
//                                 ))}
//                                 {tableLoading && <CircularProgress />}
//                             </TableBody>
//                             <TableFooter style={{ ...props.footerStyle }}>
//                                 <TableRow>
//                                     <TableCell colSpan={showKeys().length + 2} style={{ alignItems: "flex-end" }} >
//                                         <Pagination count={maxPage} page={page} onChange={(e, p) => fetchData(p)} showFirstButton showLastButton />
//                                     </TableCell>
//                                 </TableRow>
//                             </TableFooter>
//                         </Table>
//                     </TableContainer >


//                     <Dialog
//                         open={modalShowed}
//                         onClose={() => setModalShowed(false)}
//                         aria-labelledby="responsive-dialog-title">
//                         <DialogTitle id="responsive-dialog-title">
//                             Edit
//                         </DialogTitle>
//                         <DialogContent>
//                             <CrudableValidation initialValues={props.initalValue} onSubmit={onInputSubmit} >
//                                 {
//                                     inputKeys().map(key =>
//                                         inputFromKey(key)
//                                     )
//                                 }
//                             </CrudableValidation>
//                         </DialogContent>
//                         <DialogActions>
//                             <IconButton size='medium' onClick={() => setModalShowed(false)}>
//                                 <ClearIcon fontSize='medium' />
//                             </IconButton>
//                             <IconButton size='medium' color='warning' aria-label="edit">
//                                 <Edit fontSize='medium' onClick={() => setModalShowed(false)} />
//                             </IconButton>
//                         </DialogActions>
//                     </Dialog>

//                     <Dialog
//                         open={dialogShowed}
//                         keepMounted
//                         onClose={() => setDialogShowed(false)}
//                         aria-describedby="alert-dialog-slide-description">
//                         <DialogTitle>Confirmation</DialogTitle>
//                         <DialogContent>
//                             <DialogContentText id="alert-dialog-slide-description">
//                                 Do you want to delete it ?
//                             </DialogContentText>
//                         </DialogContent>
//                         <DialogActions>
//                             <IconButton size='medium' onClick={() => setDialogShowed(false)}>
//                                 <ClearIcon fontSize='medium' />
//                             </IconButton>
//                             <IconButton size='medium' color='error'>
//                                 <DeleteIcon fontSize='medium' onClick={() => setDialogShowed(false)} />
//                             </IconButton>
//                         </DialogActions>
//                     </Dialog>
//                 </>
//             );
//         }
//     );
// }


// export default createCrudable