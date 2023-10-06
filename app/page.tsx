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
type Person = {
    id: number;
    lastName: string;
    firstName: string;
    age: number;
    birth: Date;
};

export default function page() {
    const rows: Person[] = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, birth: new Date('1990-01-01') },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, birth: new Date('1983-03-15') },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, birth: new Date('1980-11-30') },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, birth: new Date('2007-06-11') },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 45, birth: new Date('1980-07-25') }
    ];

    return (
        <FadeInDown>
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
                <DatePicker value={moment(new Date())} /> */}
            </Stack>
        </FadeInDown>
    );
}

