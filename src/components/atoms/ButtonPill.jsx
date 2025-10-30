export default function ButtonPill({ children, className = "", ...props }) {
    return (
        <button
            {...props}
            className={`rounded-full bg-white/90 px-3 py-1.5 text-sm text-slate-900 disabled:opacity-50 ${className}`}
        >
            {children}
        </button>
    );
}
