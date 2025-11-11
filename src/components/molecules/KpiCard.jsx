export default function KpiCard({ title, value, unit, icon }) {
    return (
        <div className="min-h-[84px] rounded-[20px] bg-white/85 text-[#5C5C5C] shadow-lg p-4 flex items-center justify-between">
            <div>
                <div className="text-[14px] font-semibold">{title}</div>
                <div className="flex items-baseline gap-1 text-[18px] font-extrabold tabular-nums whitespace-nowrap">
                    <span>{value}</span>
                    {unit ? <span className="text-[14px] font-semibold opacity-80">{unit}</span> : null}
                </div>
            </div>
            <div className="opacity-60">{icon}</div>
        </div>
    );
}
