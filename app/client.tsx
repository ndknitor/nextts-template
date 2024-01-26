'use client'
import ValidationDatePicker from '@/components/client/ValidationDatePicker';
import ValidationInput from '@/components/client/ValidationInput';
import useGlobalCount from '@/context/hooks/useGlobalCount';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export function ValidationTesting() {
    const request = Yup.object().shape({
        email: Yup
            .string()
            .email('Invalid email')
            .required('Email is required')
            .default(""),
        password: Yup
            .string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .default(""),
        date: Yup
            .date()
            .required('Date is required')
    });
    const formik = useFormik({
        initialValues: request.getDefault(),
        validationSchema: request,
        onSubmit: (values) => {
            console.log(values);
            // Toast.show('Địt mẹ mày', {
            //   duration: Toast.durations.LONG,
            //   position: Toast.positions.BOTTOM,
            //   shadow: false,
            //   animation: true,
            //   hideOnPress: true,
            //   delay: 0,
            // });
        },
    });
    const count = useGlobalCount();


    return (
        <div className='w-full max-h-screen'>
            <button className='border-gray-700 border-2 w-16' onClick={() => count.increase()}>{count.value}</button>
            <div className='flex w-full h-screen items-center justify-center'>
                <div className='w-9/12'>
                    <div className='h-20'>
                        <ValidationInput formik={formik} type='text' name='email' placeholder='Email' />
                    </div>
                    <div className='h-20'>
                        <ValidationInput formik={formik} type='password' name='password' placeholder='Password' />
                    </div>
                    <div className='h-20'>
                        <ValidationDatePicker formik={formik} name='date' type='datetime-local' />
                    </div>
                    <div className='flex w-full justify-center'>
                        <button className='border-blue-900 border-2 p-3 rounded-lg' onClick={() => formik.handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}