import Panel from "../atoms/Panel";
import PaginationSimple from "../molecules/PaginationSimple";
import { Download } from "lucide-react";
import { degToArah } from "../weather/shared";

export default function HistoryPanel({
    query, setQuery, rowsShown, onExport,
    page, totalPages, onPrev, onNext
}) {
    // helper format waktu
    const fmtTime = (iso) => {
        if (!iso) return "-";
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return iso;
        return d.toLocaleString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // helper angka
    const num = (v) => (v === 0 || Number.isFinite(+v)) ? +v : null;

    return (
        <Panel variant="glass">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center mb-4">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari tanggal/waktu..."
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
                            <th>Hembusan Angin</th>
                            <th>Curah Hujan (mm)</th>
                            <th>Radiasi Matahari</th>
                            <th>Compass</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsShown.length === 0 && (
                            <tr>
                                <td
                                    colSpan={13}
                                    className="px-4 py-6 text-center text-slate-700"
                                >
                                    Tidak ada data.
                                </td>
                            </tr>
                        )}

                        {rowsShown.map((r, i) => {
                            const ec = r ?? {};
                            return (
                                <tr key={r.id ?? i} className="odd:bg-white/40 even:bg-white/25">
                                    <td className="px-4 py-2">
                                        {fmtTime(ec.time ?? r.created_at)}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {(() => {
                                            const v = num(ec.temperature_main_outdoor);
                                            return v != null ? v.toFixed(2) : "-";
                                        })()}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {(() => {
                                            const v = num(ec.feels_like);
                                            return v != null ? v.toFixed(2) : "-";
                                        })()}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.UVI ?? "-"}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.humidity ?? "-"}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.pressure ?? "-"}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.pressure_relative ?? "-"}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.vpd_outdoor ?? "-"}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.wind_speed ?? "-"}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.wind_gust ?? "-"}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.rain_rate ?? "-"}
                                    </td>

                                    <td className="px-4 py-2 tabular-nums">
                                        {ec.solar_irradiance ?? "-"}
                                    </td>

                                    <td className="px-4 py-2">
                                        {degToArah(ec.degree)}
                                    </td>
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
