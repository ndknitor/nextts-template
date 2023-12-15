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
                        {...props} // Include standard HTML input props
                    />
                    <HelperText show={meta.touched && Boolean(meta.error)} text={meta.touched ? meta.error : ""} />
                </>
            )}
        </Field>
    )
}

export default ValidationInput