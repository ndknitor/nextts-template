import { TextField, TextFieldProps } from '@mui/material'
import { Field, FieldProps } from 'formik'
import React from 'react'

type CrudableInputProps = TextFieldProps & {
    field?: FieldProps['field'];
    meta?: FieldProps['meta'];
}

function CrudableInput({ field, meta, ...props }: CrudableInputProps) {
    if (field && meta) {
        // Render with Formik props
        return (
            <TextField
                {...props}
                autoFocus
                margin="dense"
                fullWidth
                variant="standard"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched ? meta.error : ''}
                {...field}
            />
        );
    } else {
        // Render without Formik props
        return (
            <TextField
                {...props}
                autoFocus
                margin="dense"
                fullWidth
                variant="standard"
            />
        );
    }
}
export default CrudableInput