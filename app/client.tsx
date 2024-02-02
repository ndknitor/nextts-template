'use client'
import ValidationDatePicker from '@/components/client/ValidationDatePicker';
import ValidationInput from '@/components/client/ValidationInput';
import useGlobalCount from '@/context/hooks/useGlobalCount';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dialog from '@/components/client/DialogContainer';

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
            .default("")
    });
    const formik = useFormik({
        initialValues: request.getDefault(),
        validationSchema: request,
        onSubmit: (values) => {
            toast.info("Wow so easy!");
        },
    });
    const count = useGlobalCount();
    return (
        <div className='w-full max-h-screen'>
            <div className="inset-0 flex items-center justify-center">
                <button
                    onClick={() => dialog.warn(() => {
                        toast.info("Dit me may")
                    }, <h1>This is the body</h1>)}
                    type="button"
                    className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                    Open dialog
                </button>
            </div>
            <button className='border-gray-700 border-2 w-16' onClick={() => count.increase()}>{count.value}</button>
            <div className='flex w-full h-screen items-center justify-center'>
                <div className='w-9/12'>
                    <div className='h-20'>
                        <ValidationInput formik={formik} type='text' name='email' placeholder='Email' />
                    </div>
                    <div className='h-20'>
                        <ValidationInput formik={formik} type='password' name='password' placeholder='Password' />
                    </div>
                    <div className='flex w-full justify-center'>
                        <button className='border-blue-900 border-2 p-3 rounded-lg' onClick={() => formik.handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}