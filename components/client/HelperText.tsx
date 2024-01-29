import React from 'react';
interface HelperTextProps {
    show: boolean;
    text?: string;
}
function HelperText({ show, text }: HelperTextProps) {
    return (
        <p className={`text-sm transition-opacity text-red-600 ease-in duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
            {text}
        </p>
    );
};

export default HelperText;