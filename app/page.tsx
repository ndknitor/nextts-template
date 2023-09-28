'use client'
import ThemeTextInput from '@/components/ThemeTextInput/ThemeTextInput';
import React, { CSSProperties } from 'react';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import { Autocomplete, AutocompleteRenderInputParams, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import FadeInDown from '@/components/FadeInDown/FadeInDown';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import Validation from '@/components/Validation/Validation';
import { toast } from 'react-toastify';
import SignInRequest from '@/objects/requests/SignInRequest';
import Link from 'next/link';
import appxios from '@/components/AxiosInterceptor';
import Role from '@/objects/Role';
import moment from 'moment-timezone';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
export default function page() {
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <FadeInDown>
            <h1>{Role[Role.Admin]}</h1>
            <Stack padding={5}>


                {/* <Link href="/public/about">About</Link>
                <ThemeButton onClick={async () => {
                    // await appxios.get("", {
                    //     loadAction: {
                    //         loadingLock: true
                    //     }
                    // });
                    toast.info("dit me may");
                }}>Hello</ThemeButton>
                <h1>Hello</h1>
                <Validation
                    schema={SignInRequest}
                    onSubmit={(values) => {
                        toast.success(values.email);
                    }}>
                    <Stack rowGap={3}>
                        <ThemeTextInput name='email' label='Email' />
                        <ThemeTextInput name='password' type='password' label='Password' />
                        <ThemeButton type='submit'>Submit</ThemeButton>
                    </Stack>
                </Validation>
                <DateTimePicker value={moment(new Date())} /> */}
            </Stack>
        </FadeInDown>
    );
}

