import { useEffect, useState } from "react";
import { Sun, Cloud, Droplets, Gauge, Home, Info } from "lucide-react";
// src/components/weather/index.js
import { getGeneral, getHourly } from "../lib/api";
import {
    WeatherLayout,
    WeatherTemplate,
    ForecastSwitcher,
    ForecastList,
    WindCompassPanel,
    Compass,
    degToArah
} from "../components/weather";


export default function WeatherDashboard() {
    const [now, setNow] = useState(() => new Date());
    const [current, setCurrent] = useState([]);
    const [hourly, setHourly] = useState([]);

    useEffect(() => {
        getGeneral((data) => setCurrent(data.data))
    }, []);
    console.log(current);

    useEffect(() => {
        getHourly((data) => setHourly(data.hours));
    }, [])


    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60 * 1000);
        return () => clearInterval(id);
    }, []);


    const [view, setView] = useState("hourly");

    return (
        <WeatherLayout
            mainClassName="max-w-6xl lg:px-8"
            bottomTabs={[
                { to: "/", label: "Home", icon: Home },
                { to: "/detail", label: "Details", icon: Info },
            ]}
        >
            {/* === MOBILE (bisa dipecah lagi nanti) === */}
            <div className="md:hidden w-full">
                <div className="mx-auto max-w-[700px] px-4 pb-8">
                    <header className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mt-50 mb-50">
                        <div className="mx-auto max-w-[700px] px-4 text-center text-white select-none py-6">
                            <span className="block h-10 w-px bg-white/70 mb-4 mx-auto" />
                            <div className="text-sm font-extrabold tracking-wide uppercase">{current.Location}</div>
                            <div className="mt-2 text-[18px] font-bold opacity-90">{(current.time || "").replace(":", ".")}</div>
                            <div className="mt-2 flex items-end justify-center leading-none">
                                <span className="text-[56px] font-extrabold tracking-tight">{current.temp}</span>
                                <span className="text-[40px] font-extrabold ml-1">°</span>
                                <span className="text-[56px] font-extrabold ml-1">C</span>
                                <Sun className="ml-2 mb-2 h-5 w-5 text-yellow-300" />
                            </div>
                            <div className="mt-2 text-[16px] font-extrabold opacity-90">
                                {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit" })}
                            </div>
                            <div className="mt-1 text-[20px] font-extrabold">{current.weather}</div>
                        </div>
                    </header>

                    <section className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                        <div className="rounded-[22px] bg-white text-slate-900 shadow-xl px-4 py-4 w-full overflow-hidden">
                            <ul className="space-y-3 text-[12px]">
                                <li className="flex items-start justify-between gap-3">
                                    <span className="flex items-center gap-2 font-semibold">
                                        <Cloud className="h-4 w-4 opacity-70" /> Titik Embun
                                    </span>
                                    <span className="font-extrabold tabular-nums">{current.titikembun}°C</span>
                                </li>
                                <li className="flex items-start justify-between gap-3">
                                    <span className="flex items-center gap-2 font-semibold">
                                        <Droplets className="h-4 w-4 opacity-70" /> Kelembapan
                                    </span>
                                    <span className="font-extrabold tabular-nums">{current.dew_point}%</span>
                                </li>
                                <li className="flex items-start justify-between gap-3">
                                    <span className="flex items-center gap-2 font-semibold">
                                        <Sun className="h-4 w-4 opacity-70" /> UV index
                                    </span>
                                    <span className="font-extrabold tabular-nums">{current.UV} of 10</span>
                                </li>
                                <li className="flex items-start justify-between gap-3">
                                    <span className="flex items-center gap-2 font-semibold">
                                        <Gauge className="h-4 w-4 opacity-70" /> Tekanan Udara
                                    </span>
                                    <span className="inline-flex items-baseline justify-end gap-1 tabular-nums text-right whitespace-nowrap shrink-0">
                                        <span className="font-extrabold text-[13px]">{Number(current.Pressure).toFixed(2)}</span>
                                        <span className="font-semibold opacity-80 text-[12px]">Pa</span>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-[22px] border border-white/40 bg-white/10 backdrop-blur-xl shadow-xl px-4 py-3 text-white w-full max-[400px]:mt-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="flex items-center gap-1 text-[14px] font-semibold">Angin</span>
                                <span className="text-[12px] opacity-90 whitespace-nowrap">
                                    {current.wind_speed} <span className="ml-0.5">km/j</span>
                                </span>
                            </div>
                            <div className="mt-1 flex justify-center"><Compass deg={current.deg} /></div>
                            <div className="mt-1 text-center text-[16px] font-extrabold">{degToArah(current.deg)}</div>
                        </div>
                    </section>

                    <section className="mt-4" />
                </div>
            </div>

            {/* === DESKTOP === */}
            <div className="hidden md:grid md:grid-cols-12 gap-5 auto-rows-fr">
                <WeatherTemplate
                    header={{
                        place: current.Location,
                        time: now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }),
                    }}
                    hero={{ temp: current.temp, status: current.weather }}
                    stats={{
                        humidity: current.humidity,
                        dewPoint: current.dew_point,
                        pressure: current.Pressure,
                        uv: current.UV,
                    }}
                />
                <WindCompassPanel speed={current.wind_speed} deg={current.deg} />
            </div>

            {/* Forecast */}
            <ForecastSwitcher value={view} onChange={setView} />
            <ForecastList view={view} hourly={hourly} current={current} />
        </WeatherLayout>
    );
}
