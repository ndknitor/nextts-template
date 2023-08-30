'use client'
import ThemeTextInput from '@/components/ThemeTextInput/ThemeTextInput'
import React from 'react'
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import { Stack } from '@mui/material';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers';
import Link from 'next/link';
import FadeInDown from '@/components/FadeInDown/FadeInDown';
import Validation from '@/components/Validation/Validation';
import appxios from '@/components/AxiosInterceptor';
import axios from 'axios';

function page() {
    const SignInRequest = Yup.object().shape({
        email: Yup
            .string()
            .email('Invalid email')
            .required('Email is required')
            .default(""),
        password: Yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
            .default("")
    });

    return (
        <FadeInDown>
            <Stack padding={5}>
                <Link href="/public/about">About</Link>
                <ThemeButton onClick={async () => {
                    // await appxios.get("", {
                    //     loadActiore
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
    )
}

export default page