// components/molecules/SegmentedNav.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function SegmentedNav({
    tabs, // [{ to, label, icon: Icon }]
    className = "",
}) {
    const location = useLocation();
    const navigate = useNavigate();

    const active = Math.max(0, tabs.findIndex(t => t.to === location.pathname));
    const widthPct = 100 / tabs.length;

    return (
        <div
            className={`relative inline-grid grid-cols-${tabs.length} items-center rounded-full bg-white/25 p-1 backdrop-blur-sm shadow-sm overflow-hidden select-none ${className}`}
            role="tablist"
            aria-label="Navigation"
            style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
        >
            <span
                className="absolute inset-y-1 left-1 rounded-full bg-white shadow transition-transform duration-300 ease-out will-change-transform"
                style={{
                    width: `calc(${widthPct}% - 0.5rem)`,
                    transform: `translateX(${active * 108}%)`,
                }}
                aria-hidden="true"
            />
            {tabs.map(({ to, label, icon: Icon }, i) => {
                const isActive = i === active;
                return (
                    <button
                        key={to}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => location.pathname !== to && navigate(to)}
                        className={`relative z-10 flex items-center justify-center gap-2 rounded-full px-5 py-1.5 text-sm transition-colors duration-300 ${isActive ? "text-slate-900" : "text-white"
                            }`}
                    >
                        {Icon && <Icon className="h-4 w-4" />}
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
