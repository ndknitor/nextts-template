'use client'
import Validation from '@/components/client/Validation';
import ValidationInput from '@/components/client/ValidationInput';
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
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
            .default("")
    });
    return (
        <Validation schema={request} onSubmit={(e) => {
            toast.success(e.email);
        }}>
            <ValidationInput type='text' name='email' placeholder='Email' />
            <ValidationInput type='password' name='password' placeholder='Password' />
            <button type='submit'>Submit</button>
        </Validation>
    );
}