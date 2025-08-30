import IconSpiral from './IconSpiral';

export default function Logo() {
    return (
        <div className="flex items-center gap-3">
            <IconSpiral className="h-8 w-8" />
            <span className="text-2xl font-semibold text-[#232323] tracking-[-0.04em] leading-[1.1]">
                HD
            </span>
        </div>
    );
}