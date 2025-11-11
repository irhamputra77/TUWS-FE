import {
    Sun,
    Cloud,
    CloudSun,
    CloudRain,
    CloudDrizzle,
    CloudSnow,
    CloudLightning,
    CloudFog,
    Wind,
} from "lucide-react";

const ICONS = {
    sun: { Comp: Sun, glow: "bg-yellow-300/70", color: "text-yellow-400" },
    partly: { Comp: CloudSun, glow: "bg-amber-200/50", color: "text-amber-300" },
    cloud: { Comp: Cloud, glow: "bg-slate-300/40", color: "text-slate-200" },
    rain: { Comp: CloudRain, glow: "bg-blue-300/50", color: "text-blue-300" },
    drizzle: { Comp: CloudDrizzle, glow: "bg-blue-300/40", color: "text-blue-200" },
    thunder: { Comp: CloudLightning, glow: "bg-yellow-200/40", color: "text-yellow-300" },
    fog: { Comp: CloudFog, glow: "bg-slate-200/30", color: "text-slate-100" },
    snow: { Comp: CloudSnow, glow: "bg-cyan-200/40", color: "text-cyan-200" },
    wind: { Comp: Wind, glow: "bg-sky-200/30", color: "text-sky-200" },
    default: { Comp: Cloud, glow: "bg-slate-300/40", color: "text-slate-200" },
};

function pickWeatherKey(status = "") {//ubah status sesuai dengan API
    const s = status.toLowerCase();
    if (s.includes("cerah berawan") || s.includes("partly")) return "partly";
    if (s.includes("cerah") || s.includes("sunny") || s.includes("clear")) return "sun";
    if (s.includes("gerimis") || s.includes("drizzle")) return "drizzle";
    if (s.includes("badai") || s.includes("petir") || s.includes("thunder") || s.includes("storm")) return "thunder";
    if (s.includes("hujan") || s.includes("rain")) return "rain";
    if (s.includes("kabut") || s.includes("mist") || s.includes("haze") || s.includes("fog")) return "fog";
    if (s.includes("awan") || s.includes("cloud")) return "cloud";
    return "default";
}

export default function WeatherHero({ temp, status }) {
    const key = pickWeatherKey(status);
    const { Comp: WeatherIcon, glow, color } = ICONS[key] ?? ICONS.default;

    return (
        <div className="flex items-start justify-between mt-8">
            <div className="flex items-end gap-4 text-white leading-none mt-4">
                <div className="flex items-end leading-none">
                    <span className="text-[84px] lg:text-[96px] font-extrabold tracking-tight tabular-nums">{temp}</span>
                    <span className="text-[56px] lg:text-[64px] -translate-y-[30px] font-extrabold ml-2">°</span>
                    <span className="text-[84px] lg:text-[96px] font-extrabold ml-1">C</span>
                </div>
                <span className="font-extrabold text-[28px] lg:text-[36px] -translate-y-[5px]">{status}</span>
            </div>

            <div className="relative h-20 w-20 lg:h-24 lg:w-24 shrink-0 mt-3">
                <div className={`absolute inset-0 rounded-full ${glow} blur-xl`} />
                <WeatherIcon className={`relative h-full w-full ${color}`} />
            </div>
        </div>
    );
}
