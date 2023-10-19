'use client'
import ThemeTextInput from '@/components/client/ThemeTextInput/ThemeTextInput';
import React, { CSSProperties } from 'react';
import ThemeButton from '@/components/client/ThemeButton/ThemeButton';
import { Autocomplete, AutocompleteRenderInputParams, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import FadeInDown from '@/components/client/FadeInDown/FadeInDown';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import Validation from '@/components/client/Validation/Validation';
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
    return (
        <>
            <Stack padding={5}>
                <Link href="/public/about">About</Link>
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
                <DatePicker value={moment(new Date())} />
            </Stack>
        </>
    );
}

