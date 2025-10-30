/**
 * SimpleLineChart (organism)
 * Props sama: { data, param, className }
 */
export default function SimpleLineChart({ data, param = "temp", className }) {
    const W = 860, H = 360, padX = 48, padY = 28;

    const UNIT = {
        temp: "°C", pressure: "hPa", humidity: "%", wind: "m/s", uv: "", rain: "mm", radiation: "W/m²",
    }[param] ?? "";

    const FIXED_DOMAIN = { humidity: [0, 100], uv: [0, 10] }[param] ?? null;

    if (!data?.length) {
        return <div className={className}><div className="text-white/80 text-sm">Tidak ada data</div></div>;
    }

    const xs = data.map((_, i) => padX + (i * (W - 2 * padX)) / Math.max(1, data.length - 1));
    const vals = data.map(d => +d.value);

    let minY = FIXED_DOMAIN ? FIXED_DOMAIN[0] : Math.min(...vals);
    let maxY = FIXED_DOMAIN ? FIXED_DOMAIN[1] : Math.max(...vals);
    if (!(maxY > minY)) {
        const pad = Math.abs(maxY || 1) * 0.1 + 1;
        minY = (minY ?? 0) - pad; maxY = (maxY ?? 0) + pad;
    }

    const y = (v) => (H - padY) - ((v - minY) / (maxY - minY)) * (H - 2 * padY);
    const path = xs.map((x, i) => `${i ? "L" : "M"} ${x} ${y(vals[i])}`).join(" ");

    const TICKS = 5;
    const ticks = Array.from({ length: TICKS }, (_, i) => minY + (i * (maxY - minY)) / (TICKS - 1));
    const fmt = (n) => {
        const v = Math.abs(maxY - minY) < 5 ? n.toFixed(1) : Math.round(n).toString();
        return v.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className={className}>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
                {ticks.map((t, i) => {
                    const gy = y(t);
                    return (
                        <g key={i}>
                            <line x1={padX} x2={W - padX} y1={gy} y2={gy} className="stroke-white/25" strokeWidth="1" />
                            <text x={padX - 10} y={gy + 4} textAnchor="end" className="fill-white/90 text-[11px]">
                                {fmt(t)}{UNIT ? ` ${UNIT}` : ""}
                            </text>
                        </g>
                    );
                })}
                <line x1={padX} x2={padX} y1={padY} y2={H - padY} className="stroke-white/60" strokeWidth="1.5" />
                <path d={path} className="fill-none stroke-white" strokeWidth="3" />
                {xs.map((x, i) => (
                    <g key={i}>
                        <circle cx={x} cy={y(vals[i])} r="4" className="fill-white" />
                        <text x={x} y={H - 6} textAnchor="middle" className="fill-white opacity-90 text-[12px]">
                            {data[i].label}
                        </text>
                    </g>
                ))}
                {UNIT && <text x={padX} y={padY - 8} className="fill-white/80 text-[12px]">Y: {UNIT}</text>}
            </svg>
        </div>
    );
}
