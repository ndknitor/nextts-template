'use client'
import ThemeTextInput from '@/components/ThemeTextInput/ThemeTextInput'
import SignInRequest from '@/objects/requests/SignInRequest'
import React from 'react'
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import { Stack } from '@mui/material';
import appxios, { InterceptorParams } from '@/components/AxiosInterceptor';
import ValidationWrap from '@/components/ValidationWrap/ValidationWrap';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers';
import { InferType } from 'yup';

async function page() {
    return (
        <Stack className='flex justify-center items-center h-screen gap-6 p-10'>
            <ThemeButton onClick={async () => {
                await appxios.get("", {
                    params: {
                        loadingLock: true
                    } as InterceptorParams
                });
            }}>Hello</ThemeButton>
            <h1>Hello</h1>
            <Stack className='w-full'>
                <ValidationWrap<InferType<typeof SignInRequest>>
                    validationSchema={SignInRequest}
                    onSubmit={(values) => {
                        toast.success(values.email);
                    }}>
                    <Stack rowGap={3}>
                        <ThemeTextInput name='email' placeholder='Email' />
                        <ThemeTextInput name='password' type='password' placeholder='Password' />
                        <ThemeButton type='submit'>Submit</ThemeButton>
                    </Stack>
                </ValidationWrap>
            </Stack>

            <DatePicker />
        </Stack>
    )
}

export default page