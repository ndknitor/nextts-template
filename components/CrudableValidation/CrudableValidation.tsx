import { Form, Formik, FormikHelpers } from 'formik';
import React, { PropsWithChildren } from 'react'
import { AnyObject, Maybe, ObjectSchema, object } from 'yup';

interface CrudableValidationProps<T extends Maybe<AnyObject>> extends PropsWithChildren {
    schema?: ObjectSchema<T>;
    initialValues?: T;
    onSubmit: ((values: T, formikHelpers: FormikHelpers<T>) => void | Promise<T>) & ((values: T, { setSubmitting }: FormikHelpers<T>) => void);
}
function CrudableValidation<T extends Maybe<AnyObject>>(props: CrudableValidationProps<T>) {
    return (
        <>
            {
                props.schema ?
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
                    :
                    <>
                        {props.children}
                    </>
            }
        </>
    )
}

export default CrudableValidation