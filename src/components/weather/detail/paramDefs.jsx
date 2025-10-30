import { ThermometerSun, Gauge, Wind, Droplets, CloudRain, Sun } from "lucide-react";

// helper kecil untuk memastikan angka
const num = (v) => {
    const n = typeof v === "string" ? Number(v) : v;
    return Number.isFinite(+n) ? +n : NaN;
};

// Daftar parameter untuk picker, ringkasan, dan perhitungan statistik
export const PARAMS = [
    {
        key: "temp",
        label: "Suhu",
        unit: "°C",
        icon: ThermometerSun,
        pick: (r) => num(r.suhu ?? r.temp ?? r.temperature),
    },
    {
        key: "pressure",
        label: "Tekanan Udara Relatif",
        unit: "hPa",
        icon: Gauge,
        // pakai hPa jika ada; fallback ke field lain
        pick: (r) => num(r.tekananRel ?? r.pressure_hpa ?? r.tekanan),
    },
    {
        key: "humidity",
        label: "Kelembapan",
        unit: "%",
        icon: Droplets,
        pick: (r) => num(r.kelembapan ?? r.humidity),
    },
    {
        key: "wind",
        label: "Kecepatan Angin",
        unit: "m/s",
        icon: Wind,
        pick: (r) => num(r.angin ?? r.wind_ms),
    },
    {
        key: "uv",
        label: "UV Index",
        unit: "",
        icon: Sun,
        pick: (r) => num(r.uv),
    },
    {
        key: "rain",
        label: "Curah Hujan",
        unit: "mm",
        icon: CloudRain,
        pick: (r) => num(r.hujan ?? r.rain_mm),
    },
    {
        key: "radiation",
        label: "Radiasi Matahari",
        unit: "lx", // sesuaikan dengan datamu (kamu simpan di r.radiasi / lux)
        icon: Sun,
        pick: (r) => num(r.radiasi ?? r.lux ?? r.radiation),
    },
];

// default export juga disediakan agar import lama tetap jalan
export default PARAMS;
