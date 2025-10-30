export default function SegmentedTabs({ tabs, value, onChange }) {
    const idx = Math.max(0, tabs.findIndex(t => t.value === value));
    return (
        <div className="relative inline-grid rounded-full bg-white/30 p-1 backdrop-blur-sm mb-5"
            style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0,1fr))` }}>
            <span
                className="absolute inset-y-1 left-1 rounded-full bg-white shadow transition-transform duration-300 ease-out"
                style={{ width: `calc(${100 / tabs.length}% - 0.2rem)`, transform: `translateX(${idx * 100}%)` }}
            />
            {tabs.map(t => (
                <button
                    key={t.value}
                    onClick={() => onChange(t.value)}
                    className={`relative z-10 px-5 py-1.5 text-sm rounded-full transition-colors ${value === t.value ? "text-slate-900" : "text-white"
                        }`}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}
