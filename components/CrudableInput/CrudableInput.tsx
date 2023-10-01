import { TextField, TextFieldProps } from '@mui/material'
import { Field, FieldProps } from 'formik'
import React from 'react'

function CrudableInput(props: TextFieldProps) {
    return (
        <Field name={props.name}>
            {({ field, meta }: FieldProps) => (
                <TextField
                    {...props}
                    variant='standard'
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched ? meta.error : ""}
                    {...field}
                />
            )}
        </Field>
    );

}
export default CrudableInput