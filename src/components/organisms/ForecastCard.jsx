import { useRef } from "react";
import {
    Sun,
    CloudSun,
    CloudDrizzle,
    CloudLightning,
    CloudRain,
    CloudFog,
    Cloud,
    HelpCircle
} from "lucide-react";
import iconMap from "../weather/shared/iconMap";

export default function ForecastCard({
    view = "hourly",
    hourly,
    current = {},
    className = "",
}) {
    const iconMap = {
        sun: Sun,
        partly: CloudSun,
        drizzle: CloudDrizzle,
        thunder: CloudLightning,
        rain: CloudRain,
        fog: CloudFog,
        cloud: Cloud,
        default: HelpCircle,
    };

    const scrollRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDown.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };
    const handleMouseLeave = () => (isDown.current = false);
    const handleMouseUp = () => (isDown.current = false);
    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.2;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    function pickWeatherKey(status = "") {
        const s = status.toLowerCase();
        if (s.includes("cerah / berawan") || s.includes("partly")) return "partly";
        if (s.includes("cerah") || s.includes("sunny") || s.includes("clear")) return "sun";
        if (s.includes("gerimis") || s.includes("drizzle")) return "drizzle";
        if (s.includes("badai") || s.includes("petir") || s.includes("thunder") || s.includes("storm")) return "thunder";
        if (s.includes("hujan") || s.includes("rain")) return "rain";
        if (s.includes("kabut") || s.includes("mist") || s.includes("haze") || s.includes("fog")) return "fog";
        if (s.includes("awan") || s.includes("cloud")) return "cloud";
        return "default";
    }
    // helper: format ISO -> "HH:mm"
    const toHHmm = (s) => {
        if (!s) return "—";
        const d = new Date(s);
        if (!isNaN(d)) {
            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");
            return `${hh}:${mm}`;
        }
        // fallback kalau bukan Date valid tapi pola ISO masih ada
        const m = String(s).match(/T(\d{2}):(\d{2})/);
        return m ? `${m[1]}:${m[2]}` : "—";
    };


    // ========== HOURLY STRIP ==========
    if (view === "hourly") {
        return (
            <section
                className={`rounded-[22px] md:rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl px-3 py-3 md:px-0 md:py-0 ${className}`}
            >
                <div
                    ref={scrollRef}
                    style={{ touchAction: "pan-x" }}
                    className="flex overflow-x-auto no-scrollbar text-white cursor-grab active:cursor-grabbing select-none items-stretch gap-3 md:gap-0 p-2"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {/* Tile SEKARANG */}
                    <div className="relative shrink-0 min-w-[132px] md:min-w-[178px] min-h-[172px] md:min-h-[241px] rounded-[20px] md:rounded-[32px] bg-white/85 text-[#5c5c5c] px-3 py-3 md:px-0 md:py-0 flex flex-col items-center justify-center">
                        <div className="text-[14px] md:text-[20px] font-bold opacity-95 md:pb-[30px]">Sekarang</div>
                        <div className="mt-0 md:mt-1 text-[36px] md:text-[48px] font-extrabold leading-none md:pb-[33px]">
                            {(current?.temp ?? "—")}°
                        </div>
                        <CloudSun className="h-12 w-12 md:h-[60px] md:w-[60px]" />
                        <div
                            className="
        pt-3 md:pt-[10px] md:pb-[10px]
        text-[11px] md:text-[16px]
        font-semibold opacity-95
        leading-snug
        text-center
        max-w-[120px] md:max-w-[160px]
        break-words
    "
                        >
                            {current.weather ?? "—"}
                        </div>

                    </div>

                    {/* Item jam berikutnya */}
                    {hourly.map((h) => {
                        const key = pickWeatherKey(h?.weather_predic || h?.status || "");
                        const Icon = iconMap[key] || Cloud;
                        return (
                            <div
                                key={h?.time ?? JSON.stringify(h)}
                                className="relative shrink-0 text-center min-w-[1px] md:min-w-[178px] my-1 md:my-2 py-2 md:py-3 flex flex-col items-center justify-center"
                            >
                                <div className="text-[12px] md:text-[20px] font-bold opacity-95 md:pb-[30px]">
                                    {toHHmm(h?.time)}
                                </div>

                                <div className="mb-2 mt-0.5 md:mt-1 text-[28px] md:text-[48px] font-extrabold leading-none md:pb-[33px]">
                                    {(h?.temp ?? "—")}°
                                </div>
                                <Icon className="h-12 w-12 md:h-[60px] md:w-[60px]" />
                                <div
                                    className="
                                                pt-3 md:pt-[10px] md:pb-[10px]
                                                text-[11px] md:text-[16px]
                                                font-semibold opacity-95
                                                leading-snug
                                                text-center
                                                max-w-[120px] md:max-w-[160px]
                                                break-words
                                            "
                                >
                                    {h.weather_predic ?? "—"}
                                </div>

                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }

    return (
        <section
            className={`rounded-[22px] md:rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl px-3 py-3 md:px-0 md:py-0 ${className}`}
        >
            <div
                ref={scrollRef}
                style={{ touchAction: "pan-x" }}
                className="flex overflow-x-auto no-scrollbar text-white cursor-grab active:cursor-grabbing select-none items-stretch gap-3 md:gap-0 p-2"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
            </div>
        </section>
    );
}
