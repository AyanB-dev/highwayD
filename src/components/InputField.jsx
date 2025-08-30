/**
 * 
 * @param {object} props 
 * @param {string} props.id 
 * @param {string} props.label 
 * @param {string} props.type 
 * @param {boolean} [props.active=false] 
 */
export default function InputField({ id, label, type = 'text', active = false, ...props }) {
    const borderColor = active ? 'border-[#367AFF]' : 'border-[#D9D9D9]';
    const labelColor = active ? 'text-[#367AFF]' : 'text-[#9A9A9A]';

    return (
        <div className="relative">
            <label
                htmlFor={id}
                className={`absolute -top-[10.5px] left-3 bg-white px-1 text-sm font-medium ${labelColor}`}
            >
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                className={`block h-[52px] w-full rounded-[10px] border-[1.5px] p-4 text-base font-normal text-[#232323] focus:outline-none ${borderColor}`}
                {...props}
            />
        </div>
    );
}