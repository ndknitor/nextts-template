import { FieldMetaProps } from 'formik'
import React, { InputHTMLAttributes } from 'react'
import HelperText from './HelperText'
interface ValidationInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    formik:
    {
        handleChange: {
            (e: React.ChangeEvent<any>): void;
            <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
        };
        handleBlur: {
            (e: React.FocusEvent<any, Element>): void;
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
        };
        getFieldMeta: (name: string) => FieldMetaProps<any>;
    }
}
function ValidationInput(props: ValidationInputProps) {
    const meta = props.formik.getFieldMeta(props.name);
    return (
        <>
            <input
                placeholder={props.placeholder}
                {...props}
                onBlur={props.formik.handleBlur(props.name)}
                onChange={props.formik.handleChange(props.name)}
                className={props.className || `w-full px-4 py-2 text-sm border-b ${meta.touched && Boolean(meta.error) ? "border-b-red-600" : "border-b-gray-300" } hover:border-blue-400 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75` //||'w-full h-10 p-3 border-b-2'
                }
            />
            <div className='p-1'>
                <HelperText show={meta.touched && Boolean(meta.error)} text={meta.touched ? meta.error : ""} />
            </div>
        </>
    )
}

export default ValidationInput