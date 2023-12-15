import React from 'react';
interface HelperTextProps {
    show: boolean;
    text?: string;
}
const HelperText = ({ show, text }: HelperTextProps) => {
    return (
        <p className={`transition-opacity text-red-600 ease-in duration-500 opacity-${show ? '100' : '0'}`}>
            {text}
        </p>
    );
};

export default HelperText;