import { FieldMetaProps, FormikErrors } from 'formik';
import React from 'react'
import HelperText from './HelperText';
// interface ValidationDatePickerProps {
//     name: string;
//     placeHolder?: string;
//     format?: string;
//     clearText?: string;
//     closeText?: string;
//     title?: string;
//     monthNames?: string[];
//     dayNames?: string[];
//     onChange?: () => void | Promise<void>;
//     onClose?: () => void | Promise<void>;
//     defaultValue?: Date;
//     minDate?: Date;
//     maxDate?: Date;
//     headerFormat?: string;
//     colorScheme?: string;
//     headerTextColor?: string;
//     showHeader?: boolean;
//     showFooter?: boolean;
//     showTitle?: boolean;
//     formik:
//     {
//         handleChange: {
//             (e: React.ChangeEvent<any>): void;
//             <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
//         };
//         handleBlur: {
//             (e: React.FocusEvent<any, Element>): void;
//             <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
//         };
//         getFieldMeta: (name: string) => FieldMetaProps<any>;
//         setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>
//     }
// }
interface ValidationDatePickerProps {
    name: string;
    className?: string;
    type?: "datetime-local" | "date";
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
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>
    }
}
function ValidationDatePicker(props: ValidationDatePickerProps) {
    //const [isOpen, setIsOpen] = useState(false);
    const meta = props.formik.getFieldMeta(props.name);
    return (

        <>
            <div
                className={`w-full h-10 ${meta.value || "text-gray-400"}`}
                onClick={() => {
                    //setIsOpen(true)
                }}>
                <input
                    {...props}
                    type={props.type || "date"}
                    onBlur={props.formik.handleBlur(props.name)}
                    onChange={props.formik.handleChange(props.name)}
                    className={props.className || `w-full px-4 py-2 text-sm border-b ${meta.touched && Boolean(meta.error) ? "border-b-red-600" : "border-b-gray-300" } hover:border-blue-400 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`} />
                {/* {getText(meta.value)} */}
            </div>
            <div className='p-1'>
                <HelperText show={meta.touched && Boolean(meta.error)} text={meta.touched ? meta.error : ""} />
            </div>
            {/* 
            <DatePicker
                isOpen={isOpen}
                clearText={props.clearText}
                closeText={props.closeText}
                title={props.title}
                monthNames={props.monthNames}
                dayNames={props.dayNames}
                defaultValue={props.defaultValue}
                minDate={props.minDate}
                maxDate={props.maxDate}
                headerFormat={props.headerFormat}
                colorScheme={props.colorScheme}
                headerTextColor={props.headerTextColor}
                showFooter={props.showFooter}
                showHeader={props.showHeader}
                showTitle={props.showTitle}
                onChange={e => {
                    setIsOpen(false);
                    props.formik.setFieldValue(props.name, e);
                }}
                onClose={() => setIsOpen(false)}
            /> */}
        </>
    )
}

export default ValidationDatePicker