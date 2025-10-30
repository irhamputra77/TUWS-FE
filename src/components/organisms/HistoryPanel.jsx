import Panel from "../atoms/Panel";
import PaginationSimple from "../molecules/PaginationSimple";
import { Download } from "lucide-react";

export default function HistoryPanel({
    query, setQuery, rowsShown, onExport,
    page, totalPages, onPrev, onNext
}) {
    return (
        <Panel variant="glass">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center mb-4">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari Tanggal/waktu..."
                    className="rounded-full bg-white/85 px-4 py-2 text-sm text-slate-900 outline-none placeholder-slate-500 flex-1"
                />
                <button
                    onClick={onExport}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:opacity-90 self-end lg:self-auto"
                >
                    <Download className="h-4 w-4" /> Export ke CSV
                </button>
            </div>

            <div className="overflow-x-auto rounded-[16px] border border-white/50 bg-white/35">
                <table className="min-w-[1600px] text-left text-sm text-slate-800">
                    <thead className="bg-white/70">
                        <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:font-semibold">
                            <th>Waktu</th>
                            <th>Suhu (°C)</th>
                            <th>Feels Like (°C)</th>
                            <th>UV Index</th>
                            <th>Kelembapan (%)</th>
                            <th>Tekanan Udara (Pa)</th>
                            <th>Tekanan Udara Relatif (hPa)</th>
                            <th>Tekanan Uap Jenuh (kPa)</th>
                            <th>Kecepatan Angin (m/s)</th>
                            <th>Hembusan Angin (km/j)</th>
                            <th>Curah Hujan (mm)</th>
                            <th>Radiasi Matahari (lx)</th>
                            <th>Compass</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsShown.length === 0 && (
                            <tr><td colSpan={13} className="px-4 py-6 text-center text-slate-700">Tidak ada data.</td></tr>
                        )}
                        {rowsShown.map((r, i) => {
                            const num = (v) => (v === 0 || Number.isFinite(+v)) ? +v : null;
                            return (
                                <tr key={i} className="odd:bg-white/40 even:bg-white/25">
                                    <td className="px-4 py-2">{r.waktu ?? r.timestamp ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">
                                        {num(r.suhu ?? r.temp)?.toFixed?.(2) ?? r.suhu ?? r.temp ?? "-"}
                                    </td>
                                    <td className="px-4 py-2 tabular-nums">
                                        {num(r.feelsLike ?? r.feels_like)?.toFixed?.(1) ?? r.feelsLike ?? r.feels_like ?? "-"}
                                    </td>
                                    <td className="px-4 py-2 tabular-nums">{r.uv ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">{r.kelembapan ?? r.humidity ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">{r.tekanan ?? r.pressure_pa ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">{r.tekananRel ?? r.pressure_hpa ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">{r.tekananUapJenuh ?? r.svp_kpa ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">{r.angin ?? r.wind_ms ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">{r.hembusan ?? r.gust_kmh ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">{r.hujan ?? r.rain_mm ?? "-"}</td>
                                    <td className="px-4 py-2 tabular-nums">{r.radiasi ?? r.lux ?? "-"}</td>
                                    <td className="px-4 py-2">{r.kompas ?? r.wind_dir_text ?? "-"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <PaginationSimple
                page={page}
                totalPages={totalPages}
                onPrev={onPrev}
                onNext={onNext}
            />
        </Panel>
    );
}
