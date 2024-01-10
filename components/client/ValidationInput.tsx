import { Field, FieldProps } from 'formik'
import React, { InputHTMLAttributes } from 'react'
import HelperText from './HelperText'

function ValidationInput(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Field name={props.name}>
            {({ field, meta }: FieldProps) => (
                <>
                    <input
                        {...field}
                        placeholder={props.placeholder}
                        {...props}
                        className={props.className || 'w-full h-10 p-3 border-b-2'}
                    />
                    <div className='p-1'>
                        <HelperText show={meta.touched && Boolean(meta.error)} text={meta.touched ? meta.error : ""} />
                    </div>
                </>
            )}
        </Field>
    )
}

export default ValidationInput