import React from 'react';
interface HelperTextProps {
    show: boolean;
    text?: string;
}
const HelperText = ({ show, text }: HelperTextProps) => {
    const helperTextClasses = `transition-opacity duration-600 ease-in-out opacity-${show ? '100' : '0'}`;

    return (
        <p className={helperTextClasses}>
            {text}
        </p>
    );
};

export default HelperText;
