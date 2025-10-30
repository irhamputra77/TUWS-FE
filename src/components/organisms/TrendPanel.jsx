import Panel from "../atoms/Panel";
import { H3 } from "../atoms/Heading";
import { ParamPicker, RightSummary, LineChart } from "../../components/weather/detail";

export default function TrendPanel({ range, setRange, trendData, param, setParam, stats }) {
    return (
        <div className="grid lg:grid-cols-12 gap-6">
            <Panel variant="glass" className="lg:col-span-8">
                <div className="flex items-center justify-between text-white mb-4">
                    <div className="relative">
                        <select
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                            className="appearance-none bg-white/85 text-slate-900 rounded-full px-3 py-1 text-sm pr-7"
                        >
                            <option>Pekan</option>
                            <option>Bulan</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1.5 text-slate-600">▾</span>
                    </div>
                </div>
                <LineChart data={trendData} param={param} showYAxis yTickCount={6}
                    yLines={[{ value: parseFloat(stats.avg), label: "Rata-rata" }]} />
            </Panel>

            <div className="lg:col-span-4">
                <ParamPicker value={param} onChange={setParam} />
                <RightSummary paramKey={param} stats={stats} />
            </div>
        </div>
    );
}
