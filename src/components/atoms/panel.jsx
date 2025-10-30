export default function Panel({ variant = "glass", className = "", children }) {
    const base = "rounded-[22px] shadow";
    const styles =
        variant === "solid"
            ? "bg-white/90 ring-1 ring-white/60 p-6 sm:p-8"
            : "bg-white/20 backdrop-blur-xl border border-white/40 p-6";
    return <div className={`${base} ${styles} ${className}`}>{children}</div>;
}
