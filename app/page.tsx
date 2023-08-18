'use client'
import ThemeTextInput from '@/components/ThemeTextInput/ThemeTextInput'
import SignInRequest from '@/objects/requests/SignInRequest'
import React, { useState } from 'react'
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
import appxios from '@/components/AxiosInterceptor';
import useAsyncEffect from 'use-async-effect';
import moment from 'moment';

function page() {
    const [date, setDate] = useState<Date>();
    useAsyncEffect(async () => {
        const response = await appxios.get<{ date: Date }>("http://13.212.116.185:5000/main");
        setDate(response.data.date);
    }, []);
    return (
        <FadeInDown>
            <h1>{date && moment(date).format("YYYY:MM:DD HH:mm:ss")}</h1>
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