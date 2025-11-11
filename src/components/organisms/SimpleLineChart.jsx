// components/organisms/dashboard/SimpleLineChart.jsx
import { Bold } from "lucide-react";
import { useId, useMemo } from "react";
import {
    ResponsiveContainer, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

export default function SimpleLineChart({
    data = [],
    param = "temp",
    className = "",
    height = 320,
    title,
    strokeOpacity = 0.7,    // 0..1
    gridOpacity = 0.12,     // 0..1
}) {
    if (!data?.length) {
        return <div className={className}><div className="text-white/70 text-sm">Tidak ada data</div></div>;
    }

    const UNIT = { temp: "°C", pressure: "hPa", humidity: "%", wind: "m/s", uv: "", rain: "mm", radiation: "W/m²" }[param] ?? "";
    const domain = param === "humidity" ? [0, 100] : param === "uv" ? [0, 10] : ["dataMin - 1", "dataMax + 1"];

    const uid = useId();
    const strokeId = `tstroke-${uid}`;
    const glowId = `tglow-${uid}`;

    const t = useMemo(() => ({
        lineA: Math.min(1, Math.max(0, strokeOpacity)),         // white → semi
        lineB: Math.min(1, Math.max(0, strokeOpacity * 0.6)),
        grid: Math.min(1, Math.max(1, gridOpacity)),
        axis: 0.9,
        tick: 0.88,
        glow: 1.1,
    }), [strokeOpacity, gridOpacity]);

    const tooltipStyle = {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 10,
        color: "#fff",
        backdropFilter: "blur(6px)",       // masih halus, boleh hapus jika ingin 100% transparan
        WebkitBackdropFilter: "blur(6px)",
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        const v = payload[0].value;
        return (
            <div style={tooltipStyle}>
                <div style={{ padding: "6px 10px", fontSize: 12 }}>
                    <div style={{ opacity: 0.9, fontWeight: 600 }}>{label}</div>
                    <div style={{ opacity: 0.95 }}>{v}{UNIT && ` ${UNIT}`}</div>
                </div>
            </div >
        );
    };

    return (
        <div className={className}>
            {title ? <div className="mb-1 text-white/85 text-sm font-semibold">{title}</div> : null}

            {/* tidak ada wrapper bg/border: benar2 transparan */}
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <defs>
                        {/* stroke gradient putih transparan */}
                        <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={`rgba(255,255,255,${t.lineA})`} />
                            <stop offset="100%" stopColor={`rgba(255,255,255,${t.lineB})`} />
                        </linearGradient>
                        {/* glow tipis pada garis */}
                        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                            <feGaussianBlur stdDeviation={t.glow} result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <CartesianGrid stroke={`rgba(255,255,255,${t.grid})`} strokeDasharray="2 10" />

                    <XAxis
                        dataKey="label"
                        tick={{ fill: `rgba(255,255,255,${t.tick})`, fontSize: 12 }}
                        axisLine={{ stroke: `rgba(255,255,255,${t.axis})` }}
                        tickLine={{ stroke: `rgba(255,255,255,${t.axis})` }}
                        minTickGap={18}
                        className="font-bold"
                    />
                    <YAxis
                        domain={domain}
                        tick={{ fill: `rgba(255,255,255,${t.tick})`, fontSize: 12 }}
                        axisLine={{ stroke: `rgba(255,255,255,${t.axis})` }}
                        tickLine={{ stroke: `rgba(255,255,255,${t.axis})` }}
                        tickFormatter={(v) => (UNIT ? `${v} ${UNIT}` : `${v}`)}
                        className="font-bold"
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.18)" }} />

                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={`url(#${strokeId})`}
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dot={false}
                        activeDot={{ r: 4, fill: "rgba(255,255,255,0.9)" }}
                        isAnimationActive
                        animationDuration={700}
                        animationEasing="ease-out"
                        filter={`url(#${glowId})`}
                    // TANPA AREA: transparan total
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
