import { useState } from 'react';
import DatePicker from 'react-datepicker';

export default function DatePickerField({ id, label }) {
    const [startDate, setStartDate] = useState(null);

    return (
        <div className="relative">
            { }
            <label
                htmlFor={id}
                className="absolute -top-[10.5px] left-3 z-10 bg-white px-1 text-sm font-medium text-[#9A9A9A]"
            >
                {label}
            </label>
            <DatePicker
                id={id}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd MMMM yyyy"
                placeholderText="Select a date"
                wrapperClassName="w-full"
                className="block h-[52px] w-full rounded-[10px] border-[1.5px] border-[#D9D9D9] p-4 text-base font-normal text-[#232323] focus:outline-none"
            />
        </div>
    );
}