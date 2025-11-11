import Panel from "../atoms/Panel";
import { ParamPicker, RightSummary } from "../weather/detail";
import SimpleLineChart from "./SimpleLineChart";
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
                <SimpleLineChart data={trendData} param={param} className="mt-4" />

            </Panel>

            <div className="lg:col-span-4">
                <ParamPicker value={param} onChange={setParam} />
                <RightSummary paramKey={param} stats={stats} />
            </div>
        </div>
    );
}
