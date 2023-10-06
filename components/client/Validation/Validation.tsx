import { Form, Formik, FormikHelpers } from 'formik';
import React, { PropsWithChildren } from 'react'
import { AnyObject, Maybe, ObjectSchema } from 'yup';

interface ValidationProps<T extends Maybe<AnyObject>> extends PropsWithChildren {
    schema: ObjectSchema<T>;
    initialValues?: T;
    onSubmit: ((values: T, formikHelpers: FormikHelpers<T>) => void | Promise<T>) & ((values: T, { setSubmitting }: FormikHelpers<T>) => void);
}
function Validation<T extends Maybe<AnyObject>>(props: ValidationProps<T>) {
    return (
        <Formik
            validationSchema={props.schema}
            initialValues={props.initialValues || props.schema.getDefault()}
            onSubmit={props.onSubmit}>
            {() => (
                <Form>
                    {props.children}
                </Form>
            )}
        </Formik>
    )
}

export default Validation