import { TextField, TextFieldProps } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import { Field, FieldProps } from 'formik'
import moment from 'moment';
import React from 'react'

type CrudableDateInputProps = TextFieldProps & {
    field?: FieldProps['field'];
    meta?: FieldProps['meta'];
}

function CrudableDateInput({ field, meta, ...props }: CrudableDateInputProps) {
    return (
        <DatePicker value={moment(new Date())} />

    );
}
export default CrudableDateInput