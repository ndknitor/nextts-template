'use client'
import ThemeTextInput from '@/components/ThemeTextInput/ThemeTextInput';
import React, { CSSProperties } from 'react';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import { Autocomplete, AutocompleteRenderInputParams, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import FadeInDown from '@/components/FadeInDown/FadeInDown';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import Validation from '@/components/Validation/Validation';
import { toast } from 'react-toastify';
import SignInRequest from '@/objects/requests/SignInRequest';
import Link from 'next/link';
import appxios from '@/components/AxiosInterceptor';
import moment from 'moment-timezone';
import createCrudable from '@/components/Crudable/Crudable';
type Person = {
    id: number;
    lastName: string;
    firstName: string;
    age: number;
};
const Crudable = createCrudable<Person>();

export default function page() {
    const rows: Person[] = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 23423 },
        { id: 6, lastName: 'Melisandre', firstName: "null", age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <FadeInDown>
            <Stack padding={5}>
                {
                    window &&
                    <Crudable
                        fetchData={(page) => {
                            return {
                                maxPage: 10,
                                data: rows
                            }
                        }}
                        updateAction={(item) => {
                            return undefined;
                        }}
                        deleteAction={() => {
                            return false;
                        }}
                    />
                }
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

