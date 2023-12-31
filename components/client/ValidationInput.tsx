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