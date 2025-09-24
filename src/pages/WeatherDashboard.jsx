import SeamlessBackgroundVideo from "../components/SeamlessBackgroundVideo";

import { useMemo } from "react";
import {
    Sun,
    Cloud,
    CloudRain,
    CloudSun,
    CloudLightning,
    Wind,
    Droplets,
    Gauge,
    Clock,
    Calendar,
    Compass as CompassIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";

export default function WeatherDashboard() {
    const now = new Date();
    const current = useMemo(
        () => ({
            place: "TELKOM UNIVERSITY, BANDUNG",
            time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            temp: 29,
            status: "Cerah",
            humidity: 78,
            uv: 2,
            pressure: 30.9,
            windKmh: 14,
            windDirDeg: 125,
        }),
        [now]
    );

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

    return (
        <div className="min-h-screen w-full bg-transparent dark:bg-transparent">
            {/* Background video */}
            <SeamlessBackgroundVideo
                src="/ssvid.net--Deep-Blue-Sky-Clouds-Timelapse-Free-Footage_1080p.mp4"
                crossfade={1.4}
                warmupLead={0.8}
                endCrop={0.06}
                startAt={0}
                playbackRate={1}
            />

            {/* CONTENT */}
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">



                {/* ===== MOBILE ONLY ===== */}
                <div className="md:hidden">
                    {/* Header mobile center (seperti gambar atas) */}
                    <div className="min-h-200 flex items-center justify-center flex-col">
                        <div className="flex flex-col items-center text-white text-center relative select-none">
                            <span className="block h-8 w-px bg-white/70 mb-2" />
                            <div className="text-sm font-semibold tracking-wide uppercase">{current.place}</div>
                            <div className="mt-2 text-base font-bold opacity-90">{(current.time || "").replace(":", ".")}</div>
                            <div className="relative mt-2 leading-none">
                                <span className="text-[72px] font-extrabold tracking-tight">{current.temp}°C</span>
                                <Sun className="absolute -right-6 top-1 w-7 h-7 text-yellow-300" />
                            </div>
                            <div className="mt-2 text-sm font-semibold opacity-90">
                                {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit" })}
                            </div>
                            <div className="mt-1 text-lg font-extrabold">{current.status}</div>
                        </div>
                        <span className=" text-white/40 font-['Roboto'] text-[13px] mt-10">Swipe ke bawah untuk melihat lebih detail</span>
                    </div>

                    {/* Dua kartu kaca: kiri info, kanan angin+kompas */}
                    <div className="mt-6 mx-4 grid grid-cols-2 gap-4 text-white">
                        {/* Kartu kiri */}
                        <div className="rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl p-4">
                            <div className="flex items-center gap-3">
                                <Droplets className="h-6 w-6" />
                                <div>
                                    <div className="text-sm">Kelembapan</div>
                                    <div className="text-base font-semibold">{current.humidity}%</div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                                <Sun className="h-6 w-6" />
                                <div>
                                    <div className="text-sm">UV index</div>
                                    <div className="text-base font-semibold">{current.uv} of 10</div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                                <Gauge className="h-6 w-6" />
                                <div>
                                    <div className="text-sm">Tekanan Udara</div>
                                    <div className="text-base font-semibold">{Number(current.pressure).toFixed(2)} Pa</div>
                                </div>
                            </div>
                            <div className="mt-4 h-[2px] w-24 bg-white/60 rounded" />
                        </div>

                        {/* Kartu kanan */}
                        <div className="rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl p-4 flex flex-col">
                            <div className="flex items-center w-full">
                                <div className="flex items-center gap-2 text-white">
                                    <Wind className="h-6 w-6" />
                                    <span className="text-base font-semibold">Angin</span>
                                </div>
                                <span className="ml-auto text-sm font-medium text-white">
                                    {current.windKmh}<span className="ml-1">km/j</span>
                                </span>
                            </div>
                            <div className="mt-2">
                                <Compass deg={current.windDirDeg} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== DESKTOP ONLY (kembali tampil) ===== */}
                <div className="hidden md:grid md:grid-cols-3 gap-6">
                    {/* KARTU UTAMA col-span-2 */}
                    <Card className="relative col-span-2 overflow-hidden md:px-10 md:py-7">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
                                <span className="uppercase text-[20px]">{current.place}</span>
                                <span className="mx-1 h-[1px] w-6 bg-white/70" />
                                <span className="opacity-90 text-[20px]">{current.time}</span>
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-2">
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-end">
                                    <div className="text-[96px] font-extrabold leading-none tracking-tight text-white">
                                        {current.temp}°C
                                    </div>
                                    <div className="pl-3 pb-1 text-[32px] font-bold text-white">{current.status}</div>
                                </div>
                                <div className="block">
                                    <BigSunIcon />
                                </div>
                            </div>

                            {/* INFO PILL desktop 3 kolom */}
                            <div className="mt-8 grid grid-cols-3 gap-5 w-full">
                                <InfoPill icon={<Droplets className="h-4 w-4" />} label="Kelembapan" value={`${current.humidity}%`} className="w-full h-[84px]" />
                                <InfoPill icon={<Sun className="h-4 w-4" />} label="UV index" value={`${current.uv} of 10`} className="w-full h-[84px]" />
                                <InfoPill icon={<Gauge className="h-4 w-4" />} label="Tekanan Udara" value={`${current.pressure} kPa`} className="w-full h-[84px]" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* KARTU ANGIN desktop */}
                    <Card className="rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center text-xl text-white/95">
                                <span className="text-[24px]">Angin</span>
                                <Wind className="h-9 w-9 pt-2" />
                                <span className="ml-auto text-[20px] font-normal">
                                    {current.windKmh}<span className="ml-1">km/j</span>
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="py-2">
                                <Compass deg={current.windDirDeg} />
                            </div>
                        </CardContent>
                    </Card>
                </div>


                {/* ===== PER-JAM (full width) ===== */}
                {/* ================== PER-JAM ================== */}
                {/* Mobile */}
                <Card className="mt-6 md:hidden rounded-[26px] border border-white/40 bg-white/10 backdrop-blur-xl shadow-xl">
                    <CardHeader className="px-4 pt-3 pb-1">
                        <div className="flex items-center gap-2 text-white/95">
                            <span className="font-semibold text-[18px]">Per-jam</span>
                            <Clock className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 pt-1 pb-3">
                        <div className="flex overflow-x-auto no-scrollbar text-white/95">
                            {hourly.map((h, i) => {
                                const Icon = iconMap[h.icon] || Cloud;
                                return (
                                    <div
                                        key={h.t}
                                        className="relative flex flex-col items-center px-3 py-2 min-w-[88px]"
                                    >
                                        <div className="text-[12px] opacity-90">{h.t}</div>
                                        <div className="mt-1 text-[28px] font-bold leading-none">{h.temp}°</div>
                                        <Icon className="mt-1 h-5 w-5" />
                                        {/* Divider antar item */}
                                        {i !== hourly.length - 1 && (
                                            <span className="absolute right-0 top-2 bottom-2 w-[1px] bg-white/35" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Desktop */}
                <Card className="mt-6 hidden md:block rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-white/90">
                            <span className="font-semibold text-[24px]">Per-jam</span>
                            <Clock className="h-6 w-6 mt-1.5" />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex overflow-x-auto no-scrollbar text-white">
                            {hourly.map((h) => (
                                <SmallForecast key={h.t} time={h.t} temp={h.temp} icon={h.icon} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* ================== HARIAN ================== */}
                {/* Mobile */}
                <Card className="mt-6 md:hidden rounded-[26px] border border-white/40 bg-white/10 backdrop-blur-xl shadow-xl">
                    <CardHeader className="px-4 pt-3 pb-1">
                        <div className="flex items-center gap-2 text-white/95">
                            <span className="font-semibold text-[18px]">Harian</span>
                            <Calendar className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 pt-1 pb-3">
                        <div className="flex overflow-x-auto no-scrollbar text-white/95">
                            {daily.map((d, i) => {
                                const Icon = iconMap[d.icon] || Cloud;
                                return (
                                    <div
                                        key={d.d}
                                        className="relative flex flex-col items-center px-3 py-2 min-w-[96px]"
                                    >
                                        <div className="text-[12px] font-medium">{d.d}</div>
                                        <div className="text-[11px] opacity-90 -mt-0.5">{d.date}</div>
                                        <div className="mt-1 text-[28px] font-bold leading-none">{d.temp}°</div>
                                        <Icon className="mt-1 h-5 w-5" />
                                        {/* Divider antar item */}
                                        {i !== daily.length - 1 && (
                                            <span className="absolute right-0 top-2 bottom-2 w-[1px] bg-white/35" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Desktop */}
                <Card className="mt-6 hidden md:block rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-white/90">
                            <span className="font-semibold text-[24px]">Harian</span>
                            <Calendar className="h-6 w-6 mt-1.5" />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex overflow-x-auto no-scrollbar text-white">
                            {daily.map((d) => (
                                <DailyForecast key={d.d} d={d.d} date={d.date} temp={d.temp} icon={d.icon} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );

}

/* ====== Helpers & small components (in-file) ====== */

function BackgroundVideo({ src }) {
    const url = src.startsWith("/public/") ? src.replace("/public", "") : src;

    return (
        <div aria-hidden className="fixed inset-0 -z-10">
            <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src={url} type="video/mp4" />
            </video>
            {/* Overlay agar teks tetap terbaca*/}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/40 dark:from-slate-950/60 dark:via-slate-950/60 dark:to-slate-950/60 backdrop-blur-[1px]" />
        </div>
    );
}

function InfoPill({ icon, label, value, className }) {
    return (
        <div
            className={cn(
                "relative overflow-hidden",
                "rounded-2xl border border-white/40",
                "bg-transparent shadow-lg",
                "px-4 py-4 text-sm text-white",
                className
            )}
        >
            {/* gradient putih halus */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent" />

            {/* highlight pojok kanan-atas */}
            <div className="pointer-events-none absolute -top-2 -right-2 h-1/2 w-1/2 rounded-tr-2xl bg-gradient-to-bl from-white/30 to-transparent opacity-40" />

            {/* konten utama */}
            <div className="relative flex items-center gap-2">
                {icon}
                <span className="text-[16px] font-semibold">{label}</span>
            </div>
            <div className="relative mt-1 text-[15px] font-semibold">{value}</div>
        </div>
    );
}







function BigSunIcon() {
    return (
        <>
            {/* Versi besar (desktop / tablet) */}
            <div className="hidden md:block relative h-26 w-26">
                <div className="absolute inset-0 rounded-full bg-yellow-300/70 blur-lg" />
                <Sun className="relative h-full w-full text-yellow-500" />
            </div>
        </>
    );
}

const iconMap = { Sun, Cloud, CloudRain, CloudSun, CloudLightning };

function SmallForecast({ time, temp, icon }) {
    const Icon = iconMap[icon] || Cloud;
    return (
        <div
            className="
        relative flex flex-col items-center p-3 text-center min-w-[170px]
        after:content-[''] after:absolute after:top-2 after:bottom-2 after:right-0 after:w-[1px] after:bg-white/40 last:after:hidden
      "
        >
            <div className="text-[20px] text-white">{time}</div>
            <div className="pl-3 mt-1 text-[48px] font-bold">{temp}°</div>
            <Icon className="mt-1 h-8 w-8" />
        </div>
    );
}





function DailyForecast({ d, date, temp, icon }) {
    const Icon = iconMap[icon] || Cloud;
    return (
        <div
            className="
        relative flex flex-col items-center p-3 text-center min-w-[170px]
        after:content-[''] after:absolute after:top-2 after:bottom-2 after:right-0 after:w-[1px] after:bg-white/40 last:after:hidden
      "
        >
            <div className="text-[20px] font-medium">{d}</div>
            <div className="text-[16px] text-white">{date}</div>
            <div className="mt-2 pl-3 text-[48px] font-bold">{temp}°</div>
            <Icon className="mt-1 h-8 w-8" />
        </div>
    );
}

function Compass({ deg = 100 }) {
    return (
        <div className="relative mx-auto aspect-square w-32 sm:w-40 md:w-48 select-none">
            {/* lingkaran luar */}
            <div className="absolute inset-0 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur" />
            <div className="absolute inset-2 rounded-full border border-white/70" />

            <div className="absolute inset-0 grid place-items-center">
                <div className="relative h-[72%] w-[72%] rounded-full border border-white/70">
                    {/* ikon latar */}
                    <CompassIcon className="absolute left-1/2 top-1/2 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 -translate-x-1/2 -translate-y-1/2 opacity-30 text-white" />

                    {/* cardinal */}
                    <Cardinal label="N" className="-top-3 left-1/2 -translate-x-1/2 text-white/90 drop-shadow" />
                    <Cardinal label="E" className="top-1/2 -right-3 -translate-y-1/2 text-white/90 drop-shadow" />
                    <Cardinal label="S" className="-bottom-3 left-1/2 -translate-x-1/2 text-white/90 drop-shadow" />
                    <Cardinal label="W" className="top-1/2 -left-3 -translate-y-1/2 text-white/90 drop-shadow" />

                    {/* jarum */}
                    <div
                        className="absolute left-1/2 top-1/2 h-12 sm:h-14 md:h-16 w-[2px] -translate-x-1/2 -translate-y-[103%] origin-bottom rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,.8)]"
                        style={{ rotate: `${deg}deg` }}
                    />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                </div>
            </div>
        </div>
    );
}


function Cardinal({ label, className = "" }) {
    return (
        <span
            className={cn(
                "absolute text-xs font-semibold tracking-wider text-white drop-shadow",
                className
            )}
        >
            {label}
        </span>
    );
}
