'use client'
import ThemeTextInput from '@/components/ThemeTextInput/ThemeTextInput';
import React from 'react';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import { Stack } from '@mui/material';
import FadeInDown from '@/components/FadeInDown/FadeInDown';
import { DatePicker } from '@mui/x-date-pickers';
import Validation from '@/components/Validation/Validation';
import { toast } from 'react-toastify';
import SignInRequest from '@/objects/requests/SignInRequest';
import Link from 'next/link';
import appxios from '@/components/AxiosInterceptor';
import Role from '@/objects/Role';
export default function page() {
    return (
        <FadeInDown>
            <h1>{Role[Role.Admin]}</h1>
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
                <DatePicker />
            </Stack>
        </FadeInDown>
    );
}
