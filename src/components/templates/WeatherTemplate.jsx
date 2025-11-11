import WeatherHeader from "../organisms/WeatherHeader";
import WeatherHero from "../organisms/WeatherHero";
import KpiCard from "../molecules/KpiCard";
import { Droplets, Cloud, Gauge, Sun } from "lucide-react";

export default function WeatherTemplate({ header, hero, stats, children }) {
  return (
    <main className="relative col-span-8 h-full overflow-hidden rounded-[28px] border border-white/40 bg-white/10 backdrop-blur-xl shadow-xl px-6 py-5">
      <WeatherHeader place={header.place} time={header.time} />
      <section className="p-0">
        <WeatherHero temp={hero.temp} status={hero.status} />
        <div className="mt-10 grid grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard title="Kelembapan" value={`${stats.humidity}%`} icon={<Droplets className="h-5 w-5" />} />
          <KpiCard title="Titik Embun" value={`${stats.dewPoint}°C`} icon={<Cloud className="h-5 w-5" />} />
          <KpiCard title="Tekanan Udara" value={Number(stats.pressure).toFixed(2)} unit="Pa" icon={<Gauge className="h-5 w-5" />} />
          <KpiCard title="UV Index" value={stats.uv} unit="of 10" icon={<Sun className="h-5 w-5" />} />
        </div>
      </section>
      {children}
    </main>
  );
}
