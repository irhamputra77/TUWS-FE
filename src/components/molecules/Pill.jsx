export default function Pill({ className = "", children }) {
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs
                  bg-white/20 text-slate-800 ring-1 ring-white/40 backdrop-blur
                  ${className}`}
        >
            {children}
        </span>
    );
}
