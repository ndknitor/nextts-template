'use client'
import Validation from '@/components/client/Validation';
import ValidationInput from '@/components/client/ValidationInput';
import useGlobalCount from '@/context/hooks/useGlobalCount';
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
            .default("")
    });

    return (
        <div className='w-full max-h-screen'>
            <Validation schema={request} onSubmit={(e) => {
                toast.success(e.email);
            }}>
                <div className='flex w-full h-screen items-center justify-center'>
                    <div className='w-9/12'>
                        <div className='h-20'>
                            <ValidationInput className='w-full h-10 p-3 border-2 border-blue-800 rounded-md' type='text' name='email' placeholder='Email' />
                        </div>
                        <div className='h-20'>
                            <ValidationInput className='w-full h-10 p-3 border-2 border-blue-800 rounded-md' type='password' name='password' placeholder='Password' />
                        </div>
                        <div className='flex w-full justify-center'>
                            <button className='border-blue-900 border-2 p-3 rounded-lg' type='submit'>Submit</button>
                        </div>
                    </div>
                </div>
            </Validation>
        </div>
    );
}