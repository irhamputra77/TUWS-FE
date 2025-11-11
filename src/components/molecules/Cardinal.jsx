export default function Cardinal({ label, className = "" }) {
    return (
        <span className={`absolute text-xs font-semibold tracking-wider text-white drop-shadow ${className}`}>
            {label}
        </span>
    );
}
