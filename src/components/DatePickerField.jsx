import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

// 1. A simple component for the calendar icon SVG
const CalendarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-[#232323]"
        aria-hidden="true"
    >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
        <line x1="16" x2="16" y1="2" y2="6"></line>
        <line x1="8" x2="8" y1="2" y2="6"></line>
        <line x1="3" x2="21" y1="10" y2="10"></line>
    </svg>
);

// 2. A custom input component that includes the icon
// We use forwardRef to pass a ref from DatePicker to our custom input
const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <button
        type="button"
        className="flex h-[52px] w-full items-center gap-4 rounded-[10px] border-[1.5px] border-[#D9D9D9] p-4 text-base font-normal text-[#232323] focus:outline-none"
        onClick={onClick}
        ref={ref}
    >
        <CalendarIcon />
        <span>{value || 'Select a date'}</span>
    </button>
));

export default function DatePickerField({ id, label, field }) {
    return (
        <div className="relative">
            <label
                htmlFor={id}
                className="absolute -top-[10.5px] left-3 z-10 bg-white px-1 text-sm font-medium text-[#9A9A9A]"
            >
                {label}
            </label>
            <DatePicker
                id={id}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd MMMM yyyy"
                // 3. We tell react-datepicker to use our custom input
                customInput={<CustomDateInput />}
                wrapperClassName="w-full"
            />
        </div>
    );
}