import React from 'react';

/**
 * 
 * @param {object} props 
 * @param {React.ReactNode} props.children 
 * @param {string} props.type 
 */
export default function SubmitButton({ children, type = 'submit', ...props }) {
    return (
        <button
            type={type}
            className="flex h-13 w-full items-center justify-center rounded-[10px] bg-[#367AFF] px-2 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            {...props}
        >
            {children}
        </button>
    );
}