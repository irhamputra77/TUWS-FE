export default function Surface({
    variant = "glass", // 'glass' | 'solid'
    as: Comp = "div",
    className = "",
    children,
    ...props
}) {
    const base = "rounded-[22px] shadow";
    const style =
        variant === "solid"
            ? "bg-white/90 ring-1 ring-white/60 p-6 sm:p-8"
            : "bg-white/20 backdrop-blur-xl border border-white/40 p-6";
    return (
        <Comp className={`${base} ${style} ${className}`} {...props}>
            {children}
        </Comp>
    );
}
