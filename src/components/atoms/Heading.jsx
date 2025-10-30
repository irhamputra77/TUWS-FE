export function H3({ children, className = "" }) {
    return <h3 className={`text-slate-900 text-lg sm:text-xl font-semibold ${className}`}>{children}</h3>;
}
