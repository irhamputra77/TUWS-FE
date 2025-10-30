export default function IconCircle({ icon: Icon, size = 36, className = "" }) {
    return (
        <span
            className={`inline-flex items-center justify-center rounded-full bg-white/25 ${className}`}
            style={{ width: size, height: size }}
        >
            {Icon && <Icon className="h-5 w-5" />}
        </span>
    );
}
