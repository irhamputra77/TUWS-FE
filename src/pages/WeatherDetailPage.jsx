import { useMemo, useState } from "react";
import { ThermometerSun, Gauge, Wind, CloudRain, Sun, Home, Info } from "lucide-react";
import WeatherLayout from "../components/layouts/WeatherLayout";

// aggregator lama (kompatibel)
import { MetricCard, PARAMS, exportCSV } from "../components/weather/detail";

// atomic
import SegmentedTabs from "../components/molecules/SegmentedTabs";
import TrendPanel from "../components/organisms/TrendPanel";
import HistoryPanel from "../components/organisms/HistoryPanel";
import AboutPanel from "../components/organisms/AboutPanel";

export default function WeatherDetailPage() {
    const [tab, setTab] = useState("trend");
    const [range, setRange] = useState("Pekan");
    const [param, setParam] = useState("temp");
    const [query, setQuery] = useState("");

    const history = useMemo(() => Array.from({ length: 120 }).map((_, i) => {
        const waktu = new Date(Date.now() - i * 3600 * 1000).toLocaleString("id-ID");
        const suhu = +(18 + Math.random() * 10).toFixed(2);
        const uv = Math.floor(1 + Math.random() * 9);
        const kelembapan = Math.floor(60 + Math.random() * 30);
        const angin = Math.floor(1 + Math.random() * 8);
        const hujan = +(Math.random() * 5).toFixed(2);
        const tekananRel = Math.round(1008 + Math.random() * 12);
        const tekananUapJenuh = +(0.6108 * Math.exp((17.27 * suhu) / (suhu + 237.3))).toFixed(2);
        const hembusan = Math.round((angin * (1.2 + Math.random() * 0.8)) * 3.6);
        const radiasi = Math.round(500 + Math.random() * 15000);
        const feelsLike = +(suhu + (kelembapan - 65) / 5 - (angin - 3) * 0.7).toFixed(1);
        return { waktu, suhu, uv, kelembapan, tekanan: (30 + Math.random()).toFixed(2), angin, hujan, kompas: ["Utara", "Timur", "Selatan", "Barat"][Math.floor(Math.random() * 4)], feelsLike, tekananRel, tekananUapJenuh, radiasi, hembusan };
    }), []);

    const trendData = useMemo(() => {
        const p = PARAMS.find(x => x.key === param) ?? PARAMS[0];
        const base = [18, 22, 20, 25, 23, 21, 28];
        return ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d, i) => ({
            label: d,
            value: p.key === "uv" ? Math.max(0, Math.round((base[i] - 15) / 2)) : p.key === "rain" ? Math.max(0, Math.round((Math.sin(i) + 1) * 3)) : base[i],
        }));
    }, [param]);

    const stats = useMemo(() => {
        const p = PARAMS.find(x => x.key === param) ?? PARAMS[0];
        const values = history.map(p.pick).filter(v => Number.isFinite(v));
        const max = Math.max(...values), min = Math.min(...values);
        const avg = values.reduce((s, v) => s + v, 0) / (values.length || 1);
        const fmt = (n) => (p.key === "uv" ? n.toFixed(0) : n.toFixed(0));
        return { max: fmt(max), min: fmt(min), avg: fmt(avg) };
    }, [param, history]);

    const PAGE_SIZE = 20;
    const [page, setPage] = useState(1);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return history;
        return history.filter(r => Object.values(r).some(v => (v + "").toLowerCase().includes(q)));
    }, [query, history]);
    const rowsShown = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE), [filtered, page]);
    const totalPagesShown = useMemo(() => Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)), [filtered.length]);

    const [aboutSection, setAboutSection] = useState("desc");
    const tabs = [
        { value: "trend", label: "Grafik tren" },
        { value: "history", label: "Data Historis" },
        { value: "about", label: "Tentang" },
    ];

    return (
        <WeatherLayout
            bottomTabs={[
                { to: "/", label: "Home", icon: Home },
                { to: "/detail", label: "Details", icon: Info },
            ]}
        >
            {/* metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <MetricCard icon={ThermometerSun} label="Feels like" value="18" unit="°C" />
                <MetricCard icon={Gauge} label="Tekanan Udara Relatif" value="15.12" unit="hPa" />
                <MetricCard icon={Gauge} label="Tekanan Uap Jenuh" value="12.19" unit="kPa" />
                <MetricCard icon={Sun} label="Radiasi Matahari" value="1000" unit="lx" />
                <MetricCard icon={Wind} label="Hembusan Angin" value="13" unit="Km/j" />
                <MetricCard icon={CloudRain} label="Curah Hujan" value="4.12" unit="mm" />
            </div>

            {/* segmented tabs */}
            <div className="mt-6 flex items-center justify-center">
                <SegmentedTabs tabs={tabs} value={tab} onChange={(v) => { setTab(v); if (v === "history") setPage(1); }} />
            </div>

            {tab === "trend" && (
                <TrendPanel
                    range={range}
                    setRange={setRange}
                    trendData={trendData}
                    param={param}
                    setParam={setParam}
                    stats={stats}
                />
            )}

            {tab === "history" && (
                <HistoryPanel
                    query={query}
                    setQuery={(q) => { setQuery(q); setPage(1); }}
                    rowsShown={rowsShown}
                    onExport={() => exportCSV(rowsShown)}
                    page={page}
                    totalPages={totalPagesShown}
                    onPrev={() => setPage(p => Math.max(1, p - 1))}
                    onNext={() => setPage(p => Math.min(totalPagesShown, p + 1))}
                />
            )}

            {tab === "about" && (
                <AboutPanel section={aboutSection} setSection={setAboutSection} />
            )}
        </WeatherLayout>
    );
}
