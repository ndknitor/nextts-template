'use client'
import ThemeTextInput from '@/components/ThemeTextInput/ThemeTextInput'
import SignInRequest from '@/objects/requests/SignInRequest'
import React from 'react'
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import { Fade, Stack } from '@mui/material';
import ValidationWrap from '@/components/ValidationWrap/ValidationWrap';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers';
import { InferType } from 'yup';
import Link from 'next/link';
import FadeInUp from '@/components/FadeInUp/FadeInUp';
import FadeInDown from '@/components/FadeInDown/FadeInDown';
import FadeZoomIn from '@/components/FadeZoomIn/FadeZoomIn';

function page() {
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
                <Stack>
                    <ValidationWrap<InferType<typeof SignInRequest>>
                        validationSchema={SignInRequest}
                        onSubmit={(values) => {
                            toast.success(values.email);
                        }}>
                        <Stack rowGap={3}>
                            <ThemeTextInput name='email' label='Email' />
                            <ThemeTextInput name='password' type='password' label='Password' />
                            <ThemeButton type='submit'>Submit</ThemeButton>
                        </Stack>
                    </ValidationWrap>
                </Stack>
                <DatePicker />
            </Stack>
        </FadeInDown>
    )
}

export default page