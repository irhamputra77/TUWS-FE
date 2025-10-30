import { useEffect, useMemo, useState } from "react";
import { Sun, Cloud, Droplets, Gauge, Clock, Calendar, Home, Info } from "lucide-react";

import WeatherLayout from "../components/layouts/WeatherLayout";
import { DropdownSelect, ForecastCard } from "../components/weather/dashboard";
import { Compass, degToArah } from "../components/weather/shared";

export default function WeatherDashboard() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60 * 1000);
        return () => clearInterval(id);
    }, []);

    const current = useMemo(() => ({
        place: "TELKOM UNIVERSITY, BANDUNG",
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        temp: 29, status: "Cerah", humidity: 78, uv: 2,
        pressure: 30.9, windKmh: 14, windDirDeg: 125,
    }), [now]);

    const hourly = [
        { t: "13:00", temp: 29, icon: "CloudSun" },
        { t: "14:00", temp: 28, icon: "CloudSun" },
        { t: "15:00", temp: 27, icon: "CloudSun" },
        { t: "16:00", temp: 26, icon: "Cloud" },
        { t: "17:00", temp: 26, icon: "Cloud" },
        { t: "18:00", temp: 24, icon: "Cloud" },
    ];
    const daily = [
        { d: "Senin", date: "18/08", temp: 29, icon: "CloudSun" },
        { d: "Selasa", date: "19/08", temp: 30, icon: "CloudSun" },
        { d: "Rabu", date: "20/08", temp: 23, icon: "CloudLightning" },
        { d: "Kamis", date: "21/08", temp: 28, icon: "CloudSun" },
        { d: "Jumat", date: "22/08", temp: 24, icon: "CloudRain" },
        { d: "Sabtu", date: "23/08", temp: 23, icon: "CloudRain" },
    ];

    const [view, setView] = useState("hourly");

    return (
        <WeatherLayout
            mainClassName="max-w-6xl lg:px-8"
            bottomTabs={[
                { to: "/", label: "Home", icon: Home },
                { to: "/detail", label: "Details", icon: Info },
            ]}
        >
            {/* === MOBILE === */}
            <div className="md:hidden w-full">
                <div className="mx-auto max-w-[700px] px-4 pb-8">
                    <header className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mt-50 mb-50">
                        <div className="mx-auto max-w-[700px] px-4 text-center text-white select-none py-6">
                            <span className="block h-10 w-px bg-white/70 mb-4 mx-auto" />
                            <div className="text-sm font-extrabold tracking-wide uppercase">{current.place}</div>
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
                            <div className="mt-1 text-[20px] font-extrabold">{current.status}</div>
                        </div>
                    </header>

                    <section className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                        {/* info kiri */}
                        <div className="rounded-[22px] bg-white text-slate-900 shadow-xl px-4 py-4 w-full overflow-hidden">
                            <ul className="space-y-3 text-[12px]">
                                <li className="flex items-start justify-between gap-3">
                                    <span className="flex items-center gap-2 font-semibold"><Cloud className="h-4 w-4 opacity-70" /> Titik Embun</span>
                                    <span className="font-extrabold tabular-nums">{(current.dewPoint ?? 12)}°C</span>
                                </li>
                                <li className="flex items-start justify-between gap-3">
                                    <span className="flex items-center gap-2 font-semibold"><Droplets className="h-4 w-4 opacity-70" /> Kelembapan</span>
                                    <span className="font-extrabold tabular-nums">{current.humidity}%</span>
                                </li>
                                <li className="flex items-start justify-between gap-3">
                                    <span className="flex items-center gap-2 font-semibold"><Sun className="h-4 w-4 opacity-70" /> UV index</span>
                                    <span className="font-extrabold tabular-nums">{current.uv} of 10</span>
                                </li>
                                <li className="flex items-start justify-between gap-3">
                                    <span className="flex items-center gap-2 font-semibold"><Gauge className="h-4 w-4 opacity-70" /> Tekanan Udara</span>
                                    <span className="inline-flex items-baseline justify-end gap-1 tabular-nums text-right whitespace-nowrap shrink-0">
                                        <span className="font-extrabold text-[13px]">{Number(current.pressure).toFixed(2)}</span>
                                        <span className="font-semibold opacity-80 text-[12px]">Pa</span>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* kompas */}
                        <div className="rounded-[22px] border border-white/40 bg-white/10 backdrop-blur-xl shadow-xl px-4 py-3 text-white w-full max-[400px]:mt-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="flex items-center gap-1 text-[14px] font-semibold">Angin</span>
                                <span className="text-[12px] opacity-90 whitespace-nowrap">{current.windKmh} <span className="ml-0.5">km/j</span></span>
                            </div>
                            <div className="mt-1 flex justify-center"><Compass deg={current.windDirDeg} /></div>
                            <div className="mt-1 text-center text-[16px] font-extrabold">{degToArah(current.windDirDeg)}</div>
                        </div>
                    </section>

                    <section className="mt-4" />
                </div>
            </div>

            {/* === DESKTOP === */}
            <div className="hidden md:grid md:grid-cols-12 gap-5 auto-rows-fr">
                <main className="relative col-span-8 h-full overflow-hidden rounded-[28px] border border-white/40 bg-white/10 backdrop-blur-xl shadow-xl px-6 py-5">
                    <header>
                        <section className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <span className="uppercase tracking-wide font-extrabold text-[16px]">{current.place}</span>
                                <span className="opacity-70">—</span>
                                <span className="font-semibold opacity-90 text-[18px]">
                                    {now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).replace(":", ".")}
                                </span>
                            </div>
                        </section>
                    </header>

                    <section className="p-0">
                        <div className="flex items-start justify-between mt-8">
                            <div className="flex items-end gap-4 text-white leading-none mt-4">
                                <div className="flex items-end leading-none">
                                    <span className="text-[84px] lg:text-[96px] font-extrabold tracking-tight tabular-nums">{current.temp}</span>
                                    <span className="text-[56px] lg:text-[64px] translate-y-[-30px] font-extrabold ml-2">°</span>
                                    <span className="text-[84px] lg:text-[96px] font-extrabold ml-1">C</span>
                                </div>
                                <span className="font-extrabold text-[28px] lg:text-[36px] translate-y-[-5px]">{current.status}</span>
                            </div>
                            <div className="relative h-20 w-20 lg:h-24 lg:w-24 shrink-0 mt-3">
                                <div className="absolute inset-0 rounded-full bg-yellow-300/70 blur-xl" />
                                <Sun className="relative h-full w-full text-yellow-400" />
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-2 xl:grid-cols-4 gap-4">
                            {/* 4 kartu kecil */}
                            <div className="min-h-[84px] rounded-[20px] bg-white/85 text-[#5C5C5C] shadow-lg p-4 flex items-center justify-between">
                                <div><div className="text-[14px] font-semibold">Kelembapan</div><div className="text-[18px] font-extrabold tabular-nums">{current.humidity}%</div></div>
                                <Droplets className="h-5 w-5 opacity-60" />
                            </div>
                            <div className="min-h-[84px] rounded-[20px] bg-white/85 text-[#5C5C5C] shadow-lg p-4 flex items-center justify-between">
                                <div><div className="text-[14px] font-semibold">Titik Embun</div><div className="text-[18px] font-extrabold tabular-nums">{(current.dewPoint ?? 12)}°C</div></div>
                                <Cloud className="h-5 w-5 opacity-60" />
                            </div>
                            <div className="min-h-[84px] rounded-[20px] bg-white/85 text-[#5C5C5C] shadow-lg p-4 flex items-center justify-between">
                                <div>
                                    <div className="text-[14px] font-semibold">Tekanan Udara</div>
                                    <div className="flex items-baseline gap-1 text-[18px] font-extrabold tabular-nums whitespace-nowrap">
                                        <span>{Number(current.pressure).toFixed(2)}</span><span className="text-[14px] font-semibold opacity-80">Pa</span>
                                    </div>
                                </div>
                                <Gauge className="h-5 w-5 opacity-60" />
                            </div>
                            <div className="min-h-[84px] rounded-[20px] bg-white/85 text-[#5C5C5C] shadow-lg p-4 flex items-center justify-between">
                                <div><div className="text-[14px] font-semibold">UV Index</div><div className="text-[18px] font-extrabold"><span className="tabular-nums">{current.uv}</span> <span className="opacity-80">of 10</span></div></div>
                                <Sun className="h-5 w-5 opacity-60" />
                            </div>
                        </div>
                    </section>
                </main>

                {/* Kompas */}
                <div className="col-span-4 h-full rounded-[28px] border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl p-5 flex flex-col">
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-2"><span className="text-[28px] font-semibold">Angin</span></div>
                        <div className="flex gap-2"><span className="text-[36px] font-extrabold leading-none tabular-nums">{current.windKmh}</span>
                            <div className="flex flex-col"><span className="text-[13px] font-medium opacity-90">Kecepatan</span><span className="text-[13px] font-medium opacity-90">km/j</span></div>
                        </div>
                    </div>
                    <div className="mt-3 flex-1 flex items-center justify-center"><Compass deg={current.windDirDeg} /></div>
                    <div className="mt-3 text-center text-white text-lg font-extrabold">{degToArah(current.windDirDeg)}</div>
                </div>
            </div>

            {/* Forecast */}
            <DropdownSelect
                value={view}
                onChange={setView}
                options={[
                    { value: "hourly", label: "Per-jam", icon: <Clock className="h-4 w-4" /> },
                    { value: "daily", label: "Harian", icon: <Calendar className="h-4 w-4" /> },
                ]}
            />
            <ForecastCard view={view} hourly={hourly} daily={daily} current={current} />
        </WeatherLayout>
    );
}
