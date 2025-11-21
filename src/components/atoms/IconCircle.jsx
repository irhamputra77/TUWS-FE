export default function IconCircle({
    icon: Icon,
    size = 45,
    className = "",
}) {
    return (
        <span
            className={`
                inline-flex items-center justify-center
                rounded-full bg-white/80
                text-[#5f646d]        /* warna ikon abu-abu seperti di foto */
                ${className}
            `}
            style={{ width: size, height: size }}
        >
            {Icon && <Icon className="h-6 w-6" />}
        </span>
    );
}
