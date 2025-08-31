// A simple SVG spinner component
const Spinner = () => (
    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default function SubmitButton({ children, type = 'submit', isSubmitting = false, ...props }) {
    return (
        <button
            type={type}
            // Add classes to handle the disabled state
            className="flex h-13 w-full items-center justify-center rounded-[10px] bg-[#367AFF] px-2 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
            // Disable the button when isSubmitting is true
            disabled={isSubmitting}
            {...props}
        >
            { }
            {isSubmitting ? <Spinner /> : children}
        </button>
    );
}