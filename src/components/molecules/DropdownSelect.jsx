import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DropdownSelect({
    value,
    onChange,
    options = [],
    className = "",
    placeholder = "15 Menit",
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const current = options.find((o) => o.value === value);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                className="flex items-center gap-2 rounded-xl px-3 py-[23px] text-[18px] font-semibold text-white"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {current?.label || placeholder}
                <ChevronDown className="h-4 w-4" />
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute z-20 w-44 overflow-hidden rounded-xl bg-white/80 backdrop-blur shadow-xl"
                >
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={opt.value === value}
                            onClick={() => {
                                onChange?.(opt.value);
                                setOpen(false);
                            }}
                            className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-[#5C5C5C] hover:bg-white/25 ${opt.value === value ? "bg-white/20" : ""
                                }`}
                        >
                            <div className=""></div>
                            {opt.icon}
                            <span className="text-[14px] font-medium">{opt.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
